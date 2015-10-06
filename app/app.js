import Maze from './maze/mazen';
import Player from './maze/player';
import Wall from './maze/wall';
import * as WallTexture from './maze/wallTexture';

let options = {length: 20, width: 10, cellSize: 500};

let maze = Maze.create(options);
let player = Player.create('HoBeTo', {x: 0, y: 0, z: 0}, {
    width: options.cellSize / 3,
    height: options.cellSize / 3,
    depth: options.cellSize / 3
});
maze.addPlayer(player);

//const simple_wall_front = Wall.create ({x: 1, z: 2, orientation: 'front'});
//const simple_wall_right = Wall.create ({x: 1, z: 2, orientation: 'right'});
//const simple_wall_back  = Wall.create ({x: 1, z: 2, orientation: 'back' });
//maze.addWall (simple_wall_front);
//maze.addWall (simple_wall_right);
//maze.addWall (simple_wall_back );
//
//const d4k_wall_front = Wall.create ({x: 3, z: 0, orientation: 'front'});
//const d4k_wall_right = Wall.create ({x: 3, z: 0, orientation: 'right'});
//const d4k_wall_back  = Wall.create ({x: 3, z: 0, orientation: 'back' });
//
//d4k_wall_front.setTexture (WallTexture.DEVOXX_4_KIDS);
//d4k_wall_right.setTexture (WallTexture.DEVOXX_4_KIDS);
//d4k_wall_back .setTexture (WallTexture.DEVOXX_4_KIDS);
//
//maze.addWall (d4k_wall_front);
//maze.addWall (d4k_wall_right);
//maze.addWall (d4k_wall_back );
//
//maze.start();

import MazeLoader from './maze/mazeLoader.js';
let maze2 = MazeLoader.load('maze1').then(maze => {
    maze.start()
});
