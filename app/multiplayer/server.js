/*global require,module*/

const expressWs = require('express-ws');
const {
  updateState,
  createSyncClientsMessage
} = require('./messages');

module.exports = function init(app) {
  expressWs(app);

  const playerPool = new Map();

  const filterPlayerByWebsocket = (ws) => player => {
    return playerPool.get(ws) !== player;
  }

  // Notify other sockets about player position
  const notifyOtherPlayers = (sendingSocket) => {
    const playerStates = [];
    playerPool.forEach((state) => {
      playerStates.push(state);
    });

    const nonEmptyPlayerStates = playerStates.filter(p => p !== null);

    playerPool.forEach((state, targetSocket) => {
      if (sendingSocket !== targetSocket) {
        const states = nonEmptyPlayerStates.filter(filterPlayerByWebsocket(targetSocket));
        targetSocket.send(createSyncClientsMessage(states));
      }
    });
  }

  app.ws('/players', function(ws) {
    playerPool.set(ws, null);

    // Player connection closed
    ws.addEventListener('close', () => {
      playerPool.delete(ws);
      notifyOtherPlayers(ws);
    });

    // Player message received
    ws.on('message', (msg) => {
      const newState = updateState(playerPool.get(ws), msg);
      playerPool.set(ws, newState)
      notifyOtherPlayers(ws);
    });
  });
}
