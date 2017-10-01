const TYPE_PLAYER_POSITION = 'player_position';
const TYPE_ITEM = 'item';
const TYPE_ITEMLIST = 'itemList';
const TYPE_SYNC_CLIENTS = 'sync_clients';

function encodeMessage(data) {
  return JSON.stringify(data);
}

function parseMessage(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {}
  }
}

function createMessage(type, data = {}) {
  return encodeMessage({
    type,
    data
  });
}

function createPlayerPositionUpdateMessage(playerId, position, color, created) {
  return createMessage(TYPE_PLAYER_POSITION, {
    playerId,
    position,
    color,
    created
  });
}

function createItemUpdateMessage(id, collected) {
  return createMessage(TYPE_ITEM, {
    item: {
      id,
      collected
    }
  });
}

function createItemListForPlayerMessage(playerId, items) {
  return createMessage(TYPE_ITEMLIST, {
    availableItems: items, 
    messageForPlayer: playerId
  });
}

function createSyncClientsMessage(data) {
  return createMessage(TYPE_SYNC_CLIENTS, data);
}

function updateState(state, messageAsString) {
  const { type, data } = parseMessage(messageAsString);
  
  if (state !== null && typeof state.item === 'object') {
    delete state.item;
  }
  if (state !== null && typeof state.availableItems === 'object') {
    delete state.availableItems;
    delete state.messageForPlayer;
  }
  
  switch (type) {
    case TYPE_PLAYER_POSITION:
      /** ToDo: cluster into player object */
      return Object.assign({}, state, {
        playerId: data.playerId,
        position: data.position,
        color: data.color,
        created: data.created
      });
    case TYPE_ITEM:
      return Object.assign({}, state, {
        item: data.item
      });
    case TYPE_ITEMLIST:
      return Object.assign({}, state, {
        availableItems: data.availableItems,
        messageForPlayer: data.messageForPlayer
      });
    default:
      return state;
  }
}

module.exports = {
  encodeMessage,
  parseMessage,
  updateState,
  createMessage,
  // createJoinMessage,
  createPlayerPositionUpdateMessage,
  createItemUpdateMessage,
  createItemListForPlayerMessage,
  createSyncClientsMessage,
  // TYPE_JOIN,
  TYPE_PLAYER_POSITION,
  TYPE_ITEM,
  TYPE_ITEMLIST,
  TYPE_SYNC_CLIENTS
}
