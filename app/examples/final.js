/* eslint no-unused-vars: "off" */
//Example for using the german facade for the maze

import Irrgarten from './../maze/irrgarten';
import Wand from './../maze/wall';
import * as Muster from './../maze/wallTexture';

function start() {

    const irrgarten = new Irrgarten(10,10);

    irrgarten.neuerSpieler('Max Mustermann', 8, 1);

    irrgarten.neueWand(6, 2, 'oben');
    irrgarten.neueWand(6, 2, 'rechts');
    irrgarten.neueWand(6, 3, 'unten');
    irrgarten.neueWand(6, 4, 'unten', Muster.SPECIAL);

    const meineWand = Wand.erzeugen(6,6, 'unten', Muster.HECKE);
    irrgarten.wandHinzufuegen(meineWand);

    irrgarten.neuerWuerfel(3, 0, 'Würfel');


    irrgarten.neuerFeuerball(1, 4, 'Feuerball');


    irrgarten.neuerWuerfel(1, 1, 'Beschleuniger')
        .onCollect(function() {
            irrgarten.spieler.speed *= 2;
        });


    irrgarten.neuesPortal(0, 2, 'rechts', 9, 4);


    for (let i = 2; i < 5; i++) {
        irrgarten.neueWand(1, i, 'oben');
    }

    irrgarten.alleXSekunden(3, irrgarten.neueZufallswand);


    irrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

export default {start};
