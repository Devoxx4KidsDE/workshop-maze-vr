import OtherPlayer from '../maze/otherPlayer';
import SocketConnection from './connection';

class MultiPlayerController {
  constructor(maze, uri) {
    this.player = maze.player.configuration;
    this.maze = maze;
    this.items = maze.items;
    this.connection = new SocketConnection(this.player, this.items, uri);

    this.player.onPositionChange = this.handleOwnPositionChange.bind(this);
    this.items.onCollectListener = this.handleItemChange.bind(this);
    this.connection.onOtherPlayersUpdated = this.handleOtherPlayersUpdated.bind(this);
    this.connection.onItemUpdated = this.handleItemUpdated.bind(this);
    this.connection.onItemListUpdated = this.handleItemListUpdated.bind(this);
  }

  getOtherPlayerById(id) {
    return this.maze.otherPlayers.reduce((found, player) => {
      if (found === null) {
        if (player.id === id) {
          return player;
        }
      }
      return found;
    }, null);
  }

  getPlayerInfoById(playerInfos, id) {
    return playerInfos.reduce((found, playerInfo) => {
      if (found === null) {
        if (playerInfo.playerId === id) {
          return playerInfo;
        }
      }
      return found;
    }, null);
  }

  getItemById(items, id) {
    return items.reduce((found, item) => {
      if (found === null) {
        if (item.id === id) {
          return item;
        }
      }
      return found;
    }, null);
  }

  removeDisconnectedPlayers(playerInfos) {
    const disconnectedOtherPlayers = this.maze.otherPlayers.reduce((playersToRemove, player) => {
      if (this.getPlayerInfoById(playerInfos, player.id) === null) {
        return playersToRemove.concat([player]);
      }
      return playersToRemove;
    }, []);

    disconnectedOtherPlayers.forEach((player) => {
      this.maze.removeOtherPlayer(player);
      console.log('player left', player.id);
    });
  }

  addJoinedPlayers(playerInfos) {
    playerInfos.forEach((playerInfo) => {
      if(this.isNewOtherPlayer(playerInfo)) {
        if (playerInfo.created > this.player.created) {
          this.connection.sendAvailableItemsToPlayer(playerInfo.playerId);
        }
        const otherPlayer = OtherPlayer.create(playerInfo.position, playerInfo.playerId, playerInfo.color);
        this.maze.addOtherPlayer(otherPlayer);
        console.log('new player joined', playerInfo.playerId);
      }
    });
  }

  updateOtherPlayerPositions(playerInfos) {
    this.maze.otherPlayers.forEach((otherPlayer) => {
      const playerInfo = this.getPlayerInfoById(playerInfos, otherPlayer.id);
      if (playerInfo !== null) {
        otherPlayer.setPosition(playerInfo.position);
      }
    });
  }

  updateItem(remoteItem) {
    if (remoteItem === undefined) {
      return;
    }

    this.maze.items.forEach((item) => {
      if ( item.geometry.id === remoteItem.id) {
        item.setCollected(remoteItem.collected);
        if (remoteItem.collected === true) {
          item.setVisibility(false);
          this.maze.removeFoundItem(item.name);
        }
      }
    });
  }

  updateItemList(remoteItems) {
    if (remoteItems === undefined) {
      return;
    }

    this.maze.items.forEach((item) => {
      const foundItem = this.getItemById(remoteItems, item.geometry.id);
      if (foundItem !== null) {
        item.isCollected = foundItem.collected;
        if (foundItem.collected === true) {
          item.setVisibility(false);
          this.maze.removeFoundItem(item.name);
        }
      } else {
        this.maze.removeFoundItem(item.name);
      }
    });
  }

  isNewOtherPlayer(playerInfo) {
    const player = this.getOtherPlayerById(playerInfo.playerId);
    return player === null;
  }

  handleOwnPositionChange() {
    this.connection.sendPlayerPosition()    
  }

  handleOtherPlayersUpdated(playerInfos) {
    this.addJoinedPlayers(playerInfos);
    this.removeDisconnectedPlayers(playerInfos);
    this.updateOtherPlayerPositions(playerInfos);
  }

  handleItemChange() {
    this.connection.sendItems()
  }

  handleItemUpdated(item) {
    this.updateItem(item);
  }

  handleItemListUpdated(items) {
    this.updateItemList(items);
  }
}

export default MultiPlayerController;
