const TYPE_PLAYER_POSITION = 'player_position';
const TYPE_ITEM = 'item';
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

function createPlayerPositionUpdateMessage(playerId, position, color) {
  return createMessage(TYPE_PLAYER_POSITION, {
    playerId,
    position,
    color
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

function createSyncClientsMessage(data) {
  return createMessage(TYPE_SYNC_CLIENTS, data);
}

function updateState(state, messageAsString) {
  
  if (state !== null && typeof state.item === 'object') {
    delete state.item;
  }
  const { type, data } = parseMessage(messageAsString);
  switch (type) {
    case TYPE_PLAYER_POSITION:
      /** ToDo: cluster into player object */
      return Object.assign({}, state, {
        playerId: data.playerId,
        position: data.position,
        color: data.color
      });
    case TYPE_ITEM:
      return Object.assign({}, state, {
        item: data.item
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
  createSyncClientsMessage,
  // TYPE_JOIN,
  TYPE_PLAYER_POSITION,
  TYPE_ITEM,
  TYPE_SYNC_CLIENTS
}
