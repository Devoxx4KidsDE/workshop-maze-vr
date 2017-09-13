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
    this.connection.onItemsUpdated = this.handleItemsUpdated.bind(this);
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

  updateItems(remoteItem) {
    if (remoteItem === undefined) {
      return;
    }
    console.log(remoteItem);

    this.maze.items.forEach((item) => {
      if ( item.geometry.id === remoteItem.id) {
        item.setCollected(remoteItem.collected);
        if (remoteItem.collected === true) {
          item.setVisibility = false;
          this.maze.removeFoundItem(item.name);
        }
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

  handleItemsUpdated(item) {
    this.updateItems(item);
  }
}

export default MultiPlayerController;