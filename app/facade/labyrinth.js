/*
 This is a translated copy from the facade for the german kids (see irrgarten.js).
 It provides a simplified interface that allows kids to interact with the maze
 without diving right into programming details.
 */

import Maze from '../maze/mazen';
import Player from '../maze/player';
import Wall from '../maze/wall';
import Item from '../maze/item';
import * as WallTexture from '../maze/wallTexture';

class Labyrinth {

  constructor(length, width) {
    this.myMaze = Maze.create({
      length: length,
      width: width
    });
  }

  newPlayer(name, startX, startY) {
    this.player = Player.create({
      name: name,
      startPoint: { x: startX, z: startY }
    });
    this.myMaze.addPlayer(this.player);
    return this.player;
  }

  newWall(x, y, orientation, muster) {
    let wall;
    if (muster == null) {
      wall = Wall.create({ x: x, z: y, orientation: orientation });
    } else {
      wall = Wall.create({ x: x, z: y, texture: muster, orientation: orientation });
    }

    this.myMaze.addWall(wall);
    return wall;
  }

  addingAWall(myWall) {
    this.myMaze.addWall(myWall);
    return myWall;
  }

  everyXSeconds(x, callback) {
    setInterval(callback.bind(this), x * 1000);
  }

  newRandomWall() {
    const x = Math.floor(Math.random() * this.myMaze.length);
    const y = Math.floor(Math.random() * this.myMaze.width);
    const orientation = Math.floor(Math.random() * 4);

    const wall = Wall.create({ x: x, z: y, orientation: orientation });
    this.myMaze.addWall(wall);
    return wall;
  }

  addCube(x, y, name) {
    const cube = Item.createCube({ x: x, z: y, displayName: name });
    this.myMaze.addItem(cube);
    return cube;
  }

  addFireball(x, y, name) {
    const fireball = Item.createFireball({ x: x, z: y, displayName: name });
    this.myMaze.addItem(fireball);
    return fireball;
  }

  newPortal(x, y, orientation, nachX, nachY) {
    const portal = Wall.create({ x: x, z: y, orientation: orientation });
    portal.isPortalTo({ x: nachX, z: nachY });
    portal.setTexture(WallTexture.GATE);
    this.myMaze.addWall(portal);
    return portal;
  }

  start(flyheight = 0) {
    this.myMaze.start(flyheight);
  }
}


export { Labyrinth as default };
