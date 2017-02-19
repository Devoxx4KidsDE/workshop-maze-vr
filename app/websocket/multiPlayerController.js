import OtherPlayer from '../maze/otherPlayer';
import SocketConnection from './connection';

class MultiPlayerController {
  constructor(player, maze, uri) {
    this.player = player;
    this.maze = maze;
    this.connection = new SocketConnection(player, uri);

    // this.connection.onPlayerJoined = this.handleOtherPlayerJoined.bind(this);
    // this.connection.onPlayerLeft = this.handleOtherPlayerLeft.bind(this);
    player.onPositionChange = this.handleOwnPositionChange.bind(this);
    this.connection.onOtherPlayersUpdated = this.handleOtherPlayersUpdated.bind(this);

    // this.connection.onMessage = this.handleMessage.bind(this);

  }

  // handleMessage() {
  //   const otherPlayer = OtherPlayer.create({x: 3, z: 0}, 'Hans');
  //   this.maze.addOtherPlayer(otherPlayer);
  // }
  //
  // handleOtherPlayerJoined() {
  //   const otherPlayer = OtherPlayer.create({x: 3, z: 0}, 'Hans');
  //   this.maze.addOtherPlayer(otherPlayer);
  // }
  //
  // handleOtherPlayerLeft() {
  //
  // }

  findOtherPlayerById(id) {
    return this.maze.otherPlayers.reduce((found, player) => {
      if (found === null) {
        if (player.id === id) {
          return player;
        }
      }
      return found;
    }, null);
  }

  findPlayerInfoById(playerInfos, id) {
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
      if (this.findPlayerInfoById(playerInfos, player.id) === null) {
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
        console.log(playerInfo.position, playerInfo.playerId);
        const otherPlayer = OtherPlayer.create(playerInfo.position, playerInfo.playerId);
        this.maze.addOtherPlayer(otherPlayer);
        console.log('new player joined', playerInfo.playerId);
      }
    });
  }

  updateOtherPlayerPositions(playerInfos) {
    this.maze.otherPlayers.forEach((otherPlayer) => {
      const playerInfo = this.findPlayerInfoById(playerInfos, otherPlayer.id);
      if (playerInfo !== null) {
        otherPlayer.setPosition(playerInfo.position);
      }
    });
  }

  isNewOtherPlayer(playerInfo) {
    const player = this.findOtherPlayerById(playerInfo.playerId);
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
}

export default MultiPlayerController;
