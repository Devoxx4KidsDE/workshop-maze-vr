/* eslint no-unused-vars: "off" */
//Example for using the german facade for the maze

import Irrgarten from '../facade/irrgarten';
import Wand from './../maze/wall';
import * as Muster from './../maze/wallTexture';

function start() {

    const irrgarten = new Irrgarten(10,10);

    irrgarten.neuerSpieler('Max Mustermann', 8, 1);


    irrgarten.meinIrrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

export default {start};
