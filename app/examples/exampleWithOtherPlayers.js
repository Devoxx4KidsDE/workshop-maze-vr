/* eslint no-unused-vars: "off" */

import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';
import MultiPlayerController from '../multiplayer/controller';
import mergeWithUrlParams from '../maze/playerParams';

function start() {

    const maze = Maze.create({
        length: 10,
        width: 10
    });

    const player = Player.create(mergeWithUrlParams({
      startPoint: {x: 0, z: 0}
    }));

    maze.addPlayer(player);

    // Connect to server
    const multiplayer = new MultiPlayerController(maze, `ws://${window.location.host}/players`);

    maze.start();
}

export default {start};
