/* eslint no-unused-vars: "off" */

import Irrgarten from './../maze/irrgarten';

function start() {


  var irrgarten = new Irrgarten(10,10);


  irrgarten.neuerSpieler('Max Mustermann', 8, 1);


  irrgarten.neueWand(6, 2, 'oben');
  irrgarten.neueWand(6, 2, 'rechts');
  irrgarten.neueWand(6, 3, 'unten');
  irrgarten.neueSpezialWand(6, 4, 'unten');

  irrgarten.neuerWuerfel(3, 0, 'Würfel');


  irrgarten.neuerFeuerball(1, 4, 'Feuerball');


  irrgarten.neuerWuerfel(1, 1, 'Beschleuniger')
  .onCollect(function() {
    irrgarten.spieler.speed *= 2;
  });


  irrgarten.neuesPortal(0, 2, 'rechts', 9, 4);


  for (var i = 2; i < 5; i++) {
    irrgarten.neueWand(1, i, 'oben');
  }


  irrgarten.alleXSekunden(3, irrgarten.neueZufallswand);


  irrgarten.start();
}

export default {start};
