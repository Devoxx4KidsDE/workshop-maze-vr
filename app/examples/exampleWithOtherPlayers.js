/* eslint no-unused-vars: "off" */

import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';
import MultiPlayerController from '../websocket/multiPlayerController';

function start() {
    const maze = Maze.create({
        length: 10,
        width: 10
    });

    const player = Player.create({
        name: 'Bruce Wayne',
        startPoint: {x: 5, z: 5},
        // speed: 0.8,
    });
    maze.addPlayer(player);

    // Connect to server
    const multiplayer = new MultiPlayerController(player, maze, 'ws://localhost:8080/players');

    maze.start();
}

export default {start};
