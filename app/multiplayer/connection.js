import {
  TYPE_SYNC_CLIENTS,
  parseMessage,
  createPlayerPositionUpdateMessage,
  createItemUpdateMessage,
  createItemListForPlayerMessage
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
            this.emitAvailableItemsUpdated(data);
            this.emitOtherPlayersUpdated(data);
            this.emitItemUpdated(data);
            break;
          default:
        }
    });
  }

  sendPlayerPosition() {
    if (this.open) {
      this.socket.send(
        createPlayerPositionUpdateMessage(this.playerId, this.player.position, this.player.color, this.player.created)
      );
    }
  }

  sendItems() {
    if (this.open) {
      this.items.forEach((item) => {
        this.socket.send(createItemUpdateMessage(item.geometry.id, item.isCollected));
      });
    }
  }

  sendAvailableItemsToPlayer(playerId) {
    if (this.open) {
      var itemList = [];

      this.items.forEach((item) => {
        itemList.push({
          id: item.geometry.id,
          visible: item.geometry.visible,
          collected: item.isCollected
        });
      });

      this.socket.send(createItemListForPlayerMessage(playerId, itemList));
    }
  }

  emitOtherPlayersUpdated(data) {
    if (typeof this.onOtherPlayersUpdated === 'function' && 
      typeof data[0] !== 'undefined' && 
      typeof data[0].playerId !== 'undefined') {

      this.onOtherPlayersUpdated(data);
    }
  }

  emitItemUpdated(data) {
    if (typeof this.onItemUpdated === 'function' && 
      typeof data[0] !== 'undefined' && 
      typeof data[0].item !== undefined) {

      this.onItemUpdated(data[0].item);
    }
  }

  emitAvailableItemsUpdated(data) {
    if (typeof this.onItemListUpdated === 'function' && 
      typeof data[0] !== 'undefined' && 
      this.playerId === data[0].messageForPlayer) {

      this.onItemListUpdated(data[0].availableItems);
    }
  }
}

export default SocketConnection;
