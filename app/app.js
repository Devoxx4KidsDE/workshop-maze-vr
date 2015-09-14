import * as Maze from './maze/mazen';
import * as Player from './maze/player';

let options = {length: 20, width: 10, cellSize: 500};

let maze = Maze.create(options);
let player = Player.create('HoBeTo', {x: 0, y: 0, z: 0}, {
    width: options.cellSize / 3,
    height: options.cellSize / 3,
    depth: options.cellSize / 3
});
maze.addPlayer(player);
//maze.start();

import * as MazeLoader from './maze/mazeLoader.js';
let maze2 = MazeLoader.load('maze1').then(maze => {
    maze.start()
});