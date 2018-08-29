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
import mergeWithUrlParams from '../maze/playerParams';
import MultiPlayerController from '../multiplayer/controller';

class Irrgarten {

  constructor(laenge, breite) {
    this.meinIrrgarten = Maze.create({
        length: laenge,
        width: breite,
    });
    this.meinIrrgarten.setButtonCallback(this.onButtonClick.bind(this));

    this.wuerfelZaehler = 1;
  }

  onButtonClick() {
    if (this.spieler!==undefined) {
      if (this.spieler.speed > 0) {
        this.lastSpeed = this.spieler.speed;
        this.spieler.speed = 0;
      } else {
        this.spieler.speed = this.lastSpeed;
      }
    }

  }

  neuerSpieler(name, startX, startY) {

      this.spieler = Player.create(mergeWithUrlParams({
          name: name,
          startPoint: {x: startX, z: startY}
      }));

    this.meinIrrgarten.addPlayer(this.spieler);
    return this.spieler;
  }

  neueWand(x, z, orientierung, muster) {
    let wall;
    if (muster == null) {
      wall = Wall.create({x: x, z: z, orientation: orientierung });
    } else {
      wall = Wall.create({x: x, z: z, texture: muster, orientation: orientierung });
    }

    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  wandHinzufuegen(meineWand) {
    this.meinIrrgarten.addWall(meineWand);
    return meineWand;
  }


  alleXSekunden(sekunden, callback) {
    setInterval(callback.bind(this), sekunden * 1000);
  }

  neueZufallswand() {
    const x = Math.floor(Math.random() * this.meinIrrgarten.length);
    const z = Math.floor(Math.random() * this.meinIrrgarten.width);
    const orientation = Math.floor(Math.random() * 4);

    const wall = Wall.create({x: x, z: z, orientation: orientation });
    this.meinIrrgarten.addWall(wall);
    return wall;
  }

  neuerWuerfel(x, z, name) {
    const cube = Item.createCube({x: x, z: z, displayName: name});
    this.meinIrrgarten.addItem(cube);
    return cube;
  }

  neuerFeuerball(x, z, name) {
    const feuerball = Item.createFireball({x: x, z: z, displayName: name});
    this.meinIrrgarten.addItem(feuerball);
    return feuerball;
  }

  neuesPortal(x, z, orientation, nachX, nachZ) {
    const portal = Wall.create({x: x, z: z, orientation: orientation});
    portal.isPortalTo({x: nachX, z: nachZ});
    portal.setTexture(WallTexture.GATE);
    this.meinIrrgarten.addWall(portal);
    return portal;
  }

  geradeWand(xvon, zvon, xbis, zbis, orientierung){
    var dx = Math.abs(xbis-xvon);
    var dy = Math.abs(zbis-zvon);
    var sx = (xvon < xbis) ? 1 : -1;
    var sy = (zvon < zbis) ? 1 : -1;
    var err = dx-dy;

    while(true){
        this.neueWand(xvon, zvon, orientierung, WallTexture.HECKE);

        if ((xvon==xbis) && (zvon==zbis)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; xvon  += sx; }
        if (e2 < dx){ err += dx; zvon  += sy; }
    }
  }

  punkte(xvon, zvon, xbis, zbis){
    var dx = Math.abs(xbis-xvon);
    var dy = Math.abs(zbis-zvon);
    var sx = (xvon < xbis) ? 1 : -1;
    var sy = (zvon < zbis) ? 1 : -1;
    var err = dx-dy;

    while(true){
        this.neuerWuerfel(xvon, zvon, 'Würfel ' + this.wuerfelZaehler);
        this.wuerfelZaehler++;

        if ((xvon==xbis) && (zvon==zbis)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; xvon  += sx; }
        if (e2 < dx){ err += dx; zvon  += sy; }
    }
  }

  wandx(von, bis, z) {
    for (let x = von; x <= bis; x++) {
        this.neueWand(x, z, 'links');
    }
  }

  wandz( von, bis, x) {
    for (let z = von; z <= bis; z++) {
        this.neueWand(x, z, 'oben');
    }
  }

  schreibeText(punkteVonLinks,punkteVonOben, text) {
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.fontSize = '3em';
    text2.style.backgroundColor = "red";
    text2.innerHTML = text;
    text2.style.top = punkteVonOben + 'px';
    text2.style.left = punkteVonLinks + 'px';
    document.body.appendChild(text2);
}

  starteMultiplayer() {
      var wsProtocol = "ws://";
      if (window.location.protocol==="https:") {
          wsProtocol = "wss://"
      }
      const multiplayer = new MultiPlayerController(this.meinIrrgarten, `${wsProtocol}${window.location.host}/players`);
  }

  start(flughoehe=0) {
    var urlParams = mergeWithUrlParams({
      observer: flughoehe
    });

    if (urlParams.observer == 1) {
      flughoehe = 2000;
    }

    this.meinIrrgarten.start(flughoehe);
  }
}


export {Irrgarten as default};
