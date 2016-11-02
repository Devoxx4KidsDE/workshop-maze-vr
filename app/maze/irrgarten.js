
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
    this.spieler = Player.create({
      name: name,
      startPoint: {x: startX, z: startY}
    });
    this.meinIrrgarten.addPlayer(this.spieler);
    return this.spieler;
  }

  neueWand(x, y, orientation) {
    const wall = Wall.create({x: x, z: y, orientation: this.translateOrientation(orientation) });
    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  neueSpezialWand(x, y, orientation) {
    const wall = Wall.create({x: x, z: y, orientation: this.translateOrientation(orientation) });
    wall.setTexture(WallTexture.SPECIAL)
    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  neueZufallswand() {
    var x = Math.floor(Math.random() * this.meinIrrgarten.length);
    var y = Math.floor(Math.random() * this.meinIrrgarten.width);
    var orientation = Math.floor(Math.random() * 4);

    const wall = Wall.create({x: x, z: y, orientation: this.translateOrientation(orientation) });
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

  neuesPortal(x, y, orientation, nachX, nachY) {
    const portal = Wall.create({x: x, z: y, orientation: this.translateOrientation(orientation)});
    portal.isPortalTo({x: nachX, z: nachY});
    portal.setTexture(WallTexture.GATE);
    this.meinIrrgarten.addWall(portal);
    return portal;
  }

  translateOrientation(orientation) {
    if (orientation == 'oben') { orientation = 'front'; }
    if (orientation == 'unten') { orientation = 'back'; }
    if (orientation == 'rechts') { orientation = 'right'; }
    if (orientation == 'links') { orientation = 'left'; }

    if (orientation == '0') { orientation = 'front'; }
    if (orientation == '1') { orientation = 'back'; }
    if (orientation == '2') { orientation = 'right'; }
    if (orientation == '3') { orientation = 'left'; }

    return orientation;
  }

  alleXSekunden(x, callback) {
    setInterval(callback, x * 1000);
  }

  start() {
    this.meinIrrgarten.start();
  }
}


export {Irrgarten as default};
