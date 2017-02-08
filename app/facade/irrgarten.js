/*
This is a facade create for German kids that reduces the language barrier
and provides a simplified interface that allows kids to interact with the maze
without diving right into programming details.
*/

import Maze from '../maze/mazen';
import Player from '../maze/player';
import Wall from '../maze/wall';
import Item from '../maze/item';
import * as WallTexture from '../maze/wallTexture';

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

  neueWand(x, y, orientation, muster) {
    let wall;
    if (muster == null) {
      wall = Wall.create({x: x, z: y, orientation: orientation });
    } else {
      wall = Wall.create({x: x, z: y, texture: muster, orientation: orientation });
    }

    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  wandHinzufuegen(meineWand) {
    this.meinIrrgarten.addWall(meineWand);
    return meineWand;
  }


  alleXSekunden(x, callback) {
    setInterval(callback.bind(this), x * 1000);
  }

  neueZufallswand() {
    const x = Math.floor(Math.random() * this.meinIrrgarten.length);
    const y = Math.floor(Math.random() * this.meinIrrgarten.width);
    const orientation = Math.floor(Math.random() * 4);

    const wall = Wall.create({x: x, z: y, orientation: orientation });
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
    const portal = Wall.create({x: x, z: y, orientation: orientation});
    portal.isPortalTo({x: nachX, z: nachY});
    portal.setTexture(WallTexture.GATE);
    this.meinIrrgarten.addWall(portal);
    return portal;
  }

  start() {
    this.meinIrrgarten.start();
  }
}


export {Irrgarten as default};
