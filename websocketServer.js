const expressWs = require('express-ws');
const {
  updateState,
  createSyncClientsMessage
} = require('./app/websocket/messages');

module.exports = function init(app) {
  expressWs(app);

  const playerPool = new Map();

  const isPlayerForOtherWebsocket = (ws) => player => {
    return playerPool.get(ws) !== player;
  }

  const notifyOtherPlayers = (ws) => {
    const playerStates = [];
    playerPool.forEach((state) => {
      playerStates.push(state);
    });

    const nonEmptyPlayerStates = playerStates.filter(p => p !== null);

    playerPool.forEach((state, socket) => {
      const statesRelevantForWs = nonEmptyPlayerStates.filter(isPlayerForOtherWebsocket(socket));
      socket.send(createSyncClientsMessage(statesRelevantForWs));
    });
  }

  app.ws('/players', function(ws, req) {
    playerPool.set(ws, null);

    // Player connection closed
    ws.addEventListener('close', (e) => {
      playerPool.delete(ws);
      notifyOtherPlayers(ws);
    });

    ws.on('message', (msg) => {
      const newState = updateState(playerPool.get(ws), msg);
      playerPool.set(ws, newState)
      notifyOtherPlayers(ws);
    });
  });
}
