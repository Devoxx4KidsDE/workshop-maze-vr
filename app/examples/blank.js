/* eslint no-unused-vars: "off" */
// see final.js for a working workshop example

import Irrgarten from './../maze/irrgarten';
import Wand from './../maze/wall';
import * as Muster from './../maze/wallTexture';


function start() {
    var irrgarten = new Irrgarten(10,10);

    irrgarten.start();  // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

export default {start};
