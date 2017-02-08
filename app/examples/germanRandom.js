/* eslint no-unused-vars: "off" */

import Irrgarten from '../facade/irrgarten';

function start() {
  const irrgarten = new Irrgarten(10,10);

  irrgarten.neuerSpieler('Max Mustermann', 5,5);

  irrgarten.alleXSekunden(3, irrgarten.neueZufallswand);

  irrgarten.start();
}

export default {start};
