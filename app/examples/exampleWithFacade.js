//Example for using the english facade for the maze
import Labyrinth from '../facade/labyrinth';
import Wall from './../maze/wall';
import * as Texture from './../maze/wallTexture';

function start() {

  const labyrinth = new Labyrinth(10, 10);

  labyrinth.newPlayer('Tom Hanks', 8, 1);

  labyrinth.newWall(6, 2, 'front');
  labyrinth.newWall(6, 2, 'right');
  labyrinth.newWall(6, 3, 'back');
  labyrinth.newWall(6, 4, 'back', Texture.SPECIAL);

  const myWall = Wall.generate(1, 2, 'back', Texture.HEDGE);
  labyrinth.addingAWall(myWall);

  labyrinth.addCube(3, 0, 'Cube');


  labyrinth.addFireball(8, 4, 'FireBall');


  labyrinth.addCube(1, 1, 'SpeedBoost')
    .onCollect(function() {
      labyrinth.player.speed *= 2;
    });


  labyrinth.newPortal(0, 2, 'right', 9, 4);


  for (let i = 2; i < 5; i++) {
    labyrinth.newWall(1, i, 'front');
  }

  labyrinth.everyXSeconds(3, labyrinth.newRandomWall);


  labyrinth.start(); // don't forget to add a player
}

export default { start };
