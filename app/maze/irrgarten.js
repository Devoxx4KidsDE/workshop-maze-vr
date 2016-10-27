
import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';

class Irrgarten {

  constructor(laenge, breite) {
    this.meinIrrgarten = Maze.create({
        length: laenge,
        width: breite
    });
  }

  neuerSpieler(name, startX, startY) {
    this.player = Player.create({
      name: name,
      startPoint: {x: startX, z: startY}
    });
    this.meinIrrgarten.addPlayer(this.player);
    return this.player;
  }

  neueWand(x, y, orientation) {
    if (orientation == 'oben') { orientation = 'front'; }
    if (orientation == 'unten') { orientation = 'back'; }
    if (orientation == 'rechts') { orientation = 'right'; }
    if (orientation == 'links') { orientation = 'left'; }

    const wall = Wall.create({x: 1, z: 2, orientation: orientation });
    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  neuerWuerfel(x, y, name) {
    const cube = Item.createCube({x: x, z: y, displayName: name});
    this.meinIrrgarten.addItem(cube);
    return cube;
  }

  neuerFeuerball(x, y, name) {
    const feuerball = Item.createFireball({x: x, z: y, displayName: name});
    this.meinIrrgarten.addItem(feuerball);
    return feuerball;
  }

  start() {
    this.meinIrrgarten.start();
  }
}


export {Irrgarten as default};
