import {
  TYPE_SYNC_CLIENTS,
  parseMessage,
  createPlayerPositionUpdateMessage,
  createItemUpdateMessage,
} from './messages';

const uniqueId = () => {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};

class SocketConnection {
  constructor(player, items, uri) {
    this.player = player;
    this.playerId = uniqueId();
    this.items = items;
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
            this.emitItemsUpdated(data);
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

  sendItems() {
    if (this.open) { 
      console.log(11);
      this.items.forEach((item) => {
        this.socket.send(createItemUpdateMessage(item.geometry.id, item.isCollected));
      });
    }
  }

  emitOtherPlayersUpdated(data) {
    if (typeof this.onOtherPlayersUpdated === 'function') {
      this.onOtherPlayersUpdated(data);
    }
  }

  emitItemsUpdated(data) {
    if (typeof this.onItemsUpdated === 'function') {
      this.onItemsUpdated(data[0].item);
    }
  }
}

export default SocketConnection;
