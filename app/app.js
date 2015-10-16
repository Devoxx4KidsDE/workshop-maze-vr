import Maze from './maze/mazen';
import Player from './maze/player';
import Wall from './maze/wall';
import Item from './maze/item';
import * as WallTexture from './maze/wallTexture';

let options = {length: 10, width: 10, cellSize: 500};

let maze = Maze.create(options);
let player = Player.create('Your Name', 5, {x: 0, y: 0, z: 0});
maze.addPlayer(player);

const cube = Item.createCube({width : 100, height: 100, depth: 100},
                             'green',
                             {x: 0, z: 1},
                             "cube");
cube.onCollect (function () {
    player.speed = player.speed * 5;
});
maze.addItem(cube);

const fireball = Item.createFireball(100,
                                     {x: 1, z: 1},
                                     "fireball");
fireball.onCollect (function () {
    player.speed = player.speed * 0.25;
});
maze.addItem(fireball);

const simple_wall_front = Wall.create ({x: 1, z: 2, orientation: 'front'});
const simple_wall_right = Wall.create ({x: 1, z: 2, orientation: 'right'});
const simple_wall_back  = Wall.create ({x: 1, z: 2, orientation: 'back' });
maze.addWall (simple_wall_front);
maze.addWall (simple_wall_right);
maze.addWall (simple_wall_back );

const portal = Wall.create ({x: 3, z: 0, orientation: 'front'});
const d4k_wall_right = Wall.create ({x: 3, z: 0, orientation: 'right'});
const d4k_wall_back  = Wall.create ({x: 3, z: 0, orientation: 'back' });

portal.setTexture (WallTexture.GATE);
portal.onCollision (function () {
    return {x: 5, z: 5};
})

d4k_wall_right.setTexture (WallTexture.HEDGE);
d4k_wall_back .setTexture (WallTexture.LAMP);

maze.addWall(portal);
maze.addWall(d4k_wall_right);
maze.addWall(d4k_wall_back);

maze.start();

//import MazeLoader from './maze/mazeLoader.js';
//let maze = MazeLoader.load('maze1').then(maze => {
//    maze.start()
//});
