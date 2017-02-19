// const TYPE_JOIN = 'join';
const TYPE_PLAYER_POSITION = 'player_position';
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
    data,
  });
}

// function createJoinMessage(playerId) {
//   return createMessage(TYPE_JOIN, { playerId });
// }

function createPlayerPositionUpdateMessage(playerId, position) {
  return createMessage(TYPE_PLAYER_POSITION, {
    playerId,
    position
  });
}

function createSyncClientsMessage(data) {
  return createMessage(TYPE_SYNC_CLIENTS, data);
}

function updateState(state, messageAsString) {
  const { type, data } = parseMessage(messageAsString);
  switch (type) {
    // case TYPE_JOIN:
    //   return Object.assign({}, state, {
    //     playerId: data.playerId,
    //     position: data.position
    //   });
    //   break;
    case TYPE_PLAYER_POSITION:
      return Object.assign({}, state, {
        playerId: data.playerId,
        position: data.position,
      });
      break;
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
  createSyncClientsMessage,
  // TYPE_JOIN,
  TYPE_PLAYER_POSITION,
  TYPE_SYNC_CLIENTS
}
