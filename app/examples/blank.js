/* eslint no-unused-vars: "off" */

import Irrgarten from './../maze/irrgarten';

function start() {

  var irrgarten = new Irrgarten(10,10);

  irrgarten.neuerSpieler('Bruce Wayne', 0,0);

  irrgarten.neueWand(1,1,'rechts');

  irrgarten.start();
}

export default {start};
