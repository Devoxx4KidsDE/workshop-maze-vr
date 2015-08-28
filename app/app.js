import * as Maze from './maze/mazen.js';
import * as Player from './maze/player.js';

let options = {length: 20, width: 10, cellSize: 500};

let maze = Maze.create(options);
let player = Player.create('HoBeTo', {x: 1, y: 0, z: 1}, {
    width: options.cellSize / 3,
    height: options.cellSize / 3,
    depth: options.cellSize / 3
});
maze.addPlayer(player);
maze.start();