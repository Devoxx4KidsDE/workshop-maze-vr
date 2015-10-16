import Maze from './maze/mazen';
import Player from './maze/player';
import Wall from './maze/wall';
import Item from './maze/item';
import * as WallTexture from './maze/wallTexture';

const maze = Maze.create({
    length: 10,
    width : 10
});

const player = Player.create ({
    name      : 'Bruce Wayne',
    speed     : 5,
    startPoint: {x: 0, z: 0}
});
maze.addPlayer(player);

const cube = Item.createCube({width : 100, height: 100, depth: 100}, 'green', {x: 0, z: 1}, 'cube');
      cube.onCollect (function () {
        player.speed = player.speed * 5;
      });

const fireball = Item.createFireball(100, {x: 1, z: 1}, 'fireball');
      fireball.onCollect (function () {
          const oldSpeed = player.speed;
          // player is burning and runs away in panic
          player.speed = player.speed * 3;
          // but calms down after 5 seconds
          setTimeout (() => player.speed = oldSpeed, 5 * 1000);
      });

maze.addItem(cube);
maze.addItem(fireball);

const simple_wall_front = Wall.create ({x: 1, z: 2, orientation: 'front'});
const simple_wall_right = Wall.create ({x: 1, z: 2, orientation: 'right'});
const simple_wall_back  = Wall.create ({x: 1, z: 2, orientation: 'back' });
maze.addWall (simple_wall_front);
maze.addWall (simple_wall_right);
maze.addWall (simple_wall_back );

const portal = Wall.create ({x: 3, z: 0, orientation: 'front'});
      portal.setTexture (WallTexture.GATE);
      portal.isPortalTo ({x: 5, z: 5});
maze.addWall(portal);

const hedge = Wall.create ({x: 3, z: 0, orientation: 'right'});
      hedge.setTexture (WallTexture.HEDGE);
maze.addWall(hedge);

const lamp = Wall.create ({x: 3, z: 0, orientation: 'back' });
      lamp .setTexture (WallTexture.LAMP);
maze.addWall(lamp);


maze.start();

//import MazeLoader from './maze/mazeLoader.js';
//let maze = MazeLoader.load('maze1').then(maze => {
//    maze.start()
//});
