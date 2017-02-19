/* eslint no-unused-vars: "off" */

import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';
import MultiPlayerController from '../multiplayer/controller';

function start() {
    const maze = Maze.create({
        length: 10,
        width: 10
    });

    const player = Player.create({
        name: 'Bruce Wayne',
        startPoint: {x: 5, z: 5}
    });

    maze.addPlayer(player);

    // Connect to server
    const multiplayer = new MultiPlayerController(player, maze, `ws://${window.location.host}/players`);

    maze.start();
}

export default {start};
