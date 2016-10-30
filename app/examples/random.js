/* eslint no-unused-vars: "off" */

import Irrgarten from './../maze/irrgarten';

function start() {
  var irrgarten = new Irrgarten(10,10);

  irrgarten.neuerSpieler('Max Mustermann', 5,5);

  irrgarten.alleXSekunden(3, irrgarten.neueZufallswand);

  irrgarten.start();
}

export default {start};
