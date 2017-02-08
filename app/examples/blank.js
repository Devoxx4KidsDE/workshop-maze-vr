/* eslint no-unused-vars: "off" */
// see germanExampleWithFacade.js for a working workshop example

import Irrgarten from '../facade/irrgarten';
import Wand from './../maze/wall';
import * as Muster from './../maze/wallTexture';


function start() {
    const irrgarten = new Irrgarten(10,10);

    irrgarten.start();  // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

export default {start};
