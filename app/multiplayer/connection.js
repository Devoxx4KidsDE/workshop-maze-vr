import {
  TYPE_SYNC_CLIENTS,
  parseMessage,
  createPlayerPositionUpdateMessage
} from './messages';

const uniqueId = () => {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};

class SocketConnection {
  constructor(player, uri) {
    this.player = player;
    this.playerId = uniqueId();
    this.open = false;

    this.socket = new WebSocket(uri);

    // own connection opened
    this.socket.addEventListener('open', () => {
        this.open = true;
    });

    // own connection closed
    this.socket.addEventListener('close', () => {
        this.open = false;
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
        const { type, data } = parseMessage(event.data);
        switch (type) {
          case TYPE_SYNC_CLIENTS:
            this.emitOtherPlayersUpdated(data);
            break;
          default:
        }
    });
  }

  sendPlayerPosition() {
    if (this.open) {
      this.socket.send(createPlayerPositionUpdateMessage(this.playerId, this.player.position, this.player.color));
    }
  }

  emitOtherPlayersUpdated(data) {
    if (typeof this.onOtherPlayersUpdated === 'function') {
      this.onOtherPlayersUpdated(data);
    }
  }
}

export default SocketConnection;
