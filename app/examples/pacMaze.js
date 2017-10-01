/* eslint no-unused-vars: "off" */
//Example for using the german facade for the maze

import Irrgarten from '../facade/irrgarten';
import Wand from './../maze/wall';
import * as Muster from './../maze/wallTexture';

function start() {

    const irrgarten = new Irrgarten(31,28);

    zeichnePacmanLabyrinth(irrgarten);

    irrgarten.neuerSpieler('Pac ', 1, 1);

    // Aufgabe 1: Zeichne Portal an die Stellen, wo die gelben Wände sind (siehe pacman

    // Uns sollen auch die anderen Spieler sehen
    irrgarten.starteMultiplayer();

    irrgarten.meinIrrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

function zeichnePacmanLabyrinth(irrgarten) {
    irrgarten.punkte(1, 1, 4, 1); // von links unten
    irrgarten.punkte(4, 2, 4, 6);
    irrgarten.punkte(4, 6, 29, 6); // lange Strecke nach oben
    irrgarten.punkte(4, 21, 29, 21); // das gleiche auf der rechte Seite

    irrgarten.punkte(7, 7, 7, 8);


    irrgarten.geradeWand( 1, 1, 4, 1, 'links');   // von unten links nach oben
    irrgarten.geradeWand( 4, 1, 4, 2, 'oben');   // nach rechts
    irrgarten.geradeWand( 5, 3, 6, 3, 'links');  // nach oben
    irrgarten.geradeWand( 7, 2, 7, 1, 'unten'); // nach links
    irrgarten.geradeWand( 7, 1, 10, 1, 'links'); // nach oben
    irrgarten.geradeWand( 10, 1, 10, 5, 'oben'); // nach rechts
    irrgarten.geradeWand( 11, 5, 15, 5, 'rechts'); // nach oben
    irrgarten.geradeWand( 15, 5, 15, 1, 'oben'); // nach links zum Ausgang

    irrgarten.neueWand(16, 1, 'links', Muster.STEIN); // Ausgang versperrt

    irrgarten.geradeWand( 17, 5, 17, 1, 'unten'); // oben drüber
    irrgarten.geradeWand( 17, 5, 21, 5, 'rechts'); // hoch
    irrgarten.geradeWand( 21, 5, 21, 1, 'oben'); // nach links
    irrgarten.geradeWand( 22, 1, 29, 1, 'links'); // nach ganz oben

    irrgarten.geradeWand( 29, 1, 29, 12, 'oben'); // nach rechts bis zum Mittel "finger"
    irrgarten.geradeWand( 29, 13, 26, 13, 'links'); // finger nach unten
    irrgarten.geradeWand( 26, 13, 26, 14, 'unten'); // nach rechts
    irrgarten.geradeWand( 26, 14, 29, 14, 'rechts'); // finger nach oben
    irrgarten.geradeWand( 29, 15, 29, 26, 'oben'); // ganz nach rechts


    irrgarten.geradeWand( 1, 1, 1, 26, 'unten');  // unten links komplett nach rechts

    // rechte Irrgartenwand:

    irrgarten.geradeWand( 1, 26, 4, 26, 'rechts'); // rechts unten wand / rechter rand bis mitte
    irrgarten.geradeWand( 4, 26, 4, 25, 'oben');
    irrgarten.geradeWand( 5, 25, 6, 25, 'links');
    irrgarten.geradeWand( 6, 25, 6, 26, 'oben');
    irrgarten.geradeWand( 7, 26, 10, 26, 'rechts');
    irrgarten.geradeWand( 10, 26, 10, 22, 'oben');
    irrgarten.geradeWand( 11, 22, 15, 22, 'links');
    irrgarten.geradeWand( 15, 22, 15, 26, 'oben');  // zum Ausgang rechts

    irrgarten.neueWand(16, 26, 'rechts', Muster.STEIN); // Ausgang versperrt


    irrgarten.geradeWand( 17, 22, 17, 26, 'unten');
    irrgarten.geradeWand( 17, 22, 21, 22, 'links');
    irrgarten.geradeWand( 21, 22, 21, 26, 'oben');
    irrgarten.geradeWand( 22, 26, 29, 26, 'rechts');


    irrgarten.geradeWand( 2, 1, 3, 1, 'rechts');
    irrgarten.geradeWand( 1, 2, 1, 11, 'oben');

    irrgarten.geradeWand( 4, 4, 4, 5, 'oben');
    irrgarten.geradeWand( 4, 2, 4, 6, 'unten');
    irrgarten.geradeWand( 4, 6, 6, 6, 'rechts');// t umgedreht unten links
    irrgarten.geradeWand( 6, 7, 6, 8, 'oben');
    irrgarten.geradeWand( 6, 9, 4, 9, 'links');
    irrgarten.geradeWand( 3, 9, 3, 11, 'oben');
    irrgarten.geradeWand( 3, 11, 2, 11, 'rechts');
    irrgarten.punkte(1, 2, 1, 26);

    irrgarten.geradeWand( 2, 13, 4, 13, 'links'); // t unten mitte
    irrgarten.geradeWand( 4, 12, 4, 10, 'oben');
    irrgarten.geradeWand( 5, 9, 6, 9, 'rechts');
    irrgarten.geradeWand( 7, 10, 7, 17, 'unten');
    irrgarten.geradeWand( 6, 18, 5, 18, 'links');
    irrgarten.geradeWand( 4, 17, 4, 15, 'oben');
    irrgarten.geradeWand( 4, 15, 2, 15, 'links');
    irrgarten.geradeWand( 2, 14, 2, 13, 'unten');

    irrgarten.geradeWand( 2 + 6, 13, 4 + 6, 13, 'links'); // zweites t darüber unten mitte
    irrgarten.geradeWand( 4 + 6, 12, 4 + 6, 10, 'oben');
    irrgarten.geradeWand( 5 + 6, 9, 6 + 6, 9, 'rechts');
    irrgarten.geradeWand( 7 + 6, 10, 7 + 6, 17, 'unten');
    irrgarten.geradeWand( 6 + 6, 18, 5 + 6, 18, 'links');
    irrgarten.geradeWand( 4 + 6, 17, 4 + 6, 15, 'oben');
    irrgarten.geradeWand( 4 + 6, 15, 2 + 6, 15, 'links');
    irrgarten.geradeWand( 2 + 6, 14, 2 + 6, 13, 'unten');


    irrgarten.geradeWand( 2 + 18, 13, 4 + 18, 13, 'links'); // drittes t darüber oben mitte
    irrgarten.geradeWand( 4 + 18, 12, 4 + 18, 10, 'oben');
    irrgarten.geradeWand( 5 + 18, 9, 6 + 18, 9, 'rechts');
    irrgarten.geradeWand( 7 + 18, 10, 7 + 18, 17, 'unten');
    irrgarten.geradeWand( 6 + 18, 18, 5 + 18, 18, 'links');
    irrgarten.geradeWand( 4 + 18, 17, 4 + 18, 15, 'oben');
    irrgarten.geradeWand( 4 + 18, 15, 2 + 18, 15, 'links');
    irrgarten.geradeWand( 2 + 18, 14, 2 + 18, 13, 'unten');

    irrgarten.punkte(20, 12, 22, 12); // links neben T
    irrgarten.punkte(22, 11, 22, 9);
    irrgarten.punkte(23, 9, 24, 9);

    irrgarten.punkte(20, 15, 22, 15); // rechts neben T
    irrgarten.punkte(22, 15, 22, 18);
    irrgarten.punkte(23, 18, 24, 18);

    irrgarten.geradeWand( 14, 10, 14, 17, 'unten'); // käfig mitte
    irrgarten.geradeWand( 14, 17, 18, 17, 'rechts');
    irrgarten.geradeWand( 18, 17, 18, 15, 'oben');
    irrgarten.geradeWand( 18, 12, 18, 10, 'oben');
    irrgarten.geradeWand( 18, 10, 14, 10, 'links');

    irrgarten.punkte(13, 10, 13, 17); // unter dem Käfig
    irrgarten.punkte(19, 10, 19, 17); // über dem Käfig

    irrgarten.punkte(8, 12, 9, 12);  // links neben t
    irrgarten.punkte(8, 15, 9, 15);  // rechts neben t
    irrgarten.punkte(10, 15, 10, 20);  //weiter waagerecht nach rechts


    irrgarten.geradeWand( 11, 19, 15, 19, 'links'); // rechtes i
    irrgarten.geradeWand( 15, 19, 15, 20, 'oben');
    irrgarten.geradeWand( 15, 20, 11, 20, 'rechts');
    irrgarten.geradeWand( 11, 20, 11, 19, 'unten');

    irrgarten.punkte(16, 19, 16, 20);  //über dem i
    irrgarten.punkte(11, 18, 19, 18);  //links vom rechten i nach oben


    irrgarten.geradeWand( 11, 7, 15, 7, 'links'); // linkes i
    irrgarten.geradeWand( 15, 7, 15, 8, 'oben');
    irrgarten.geradeWand( 15, 8, 11, 8, 'rechts');
    irrgarten.geradeWand( 11, 8, 11, 7, 'unten');

    irrgarten.punkte(16, 7, 16, 8);  //über dem i
    irrgarten.punkte(11, 9, 19, 9);  //rechts vom linken i nach oben

    irrgarten.geradeWand( 17, 7, 17, 8, 'unten'); // über dem i das |-
    irrgarten.geradeWand( 17, 8, 19, 8, 'rechts');
    irrgarten.geradeWand( 20, 9, 20, 11, 'unten');
    irrgarten.geradeWand( 20, 11, 21, 11, 'rechts');
    irrgarten.geradeWand( 21, 11, 21, 9, 'oben');
    irrgarten.geradeWand( 22, 8, 24, 8, 'rechts');
    irrgarten.geradeWand( 24, 8, 24, 7, 'oben');
    irrgarten.geradeWand( 24, 7, 17, 7, 'links');

    irrgarten.geradeWand( 24, 2, 23, 2, 'links'); // das  - links daneben
    irrgarten.geradeWand( 23, 2, 23, 5, 'unten');
    irrgarten.geradeWand( 23, 5, 24, 5, 'rechts');
    irrgarten.geradeWand( 24, 5, 24, 2, 'oben');

    irrgarten.punkte(22, 5, 22, 1);  // irrgarten.punkte im oberen Bereich
    irrgarten.punkte(23, 1, 24, 1);
    irrgarten.punkte(26, 1, 29, 1);
    irrgarten.punkte(29, 2, 29, 5);
    irrgarten.punkte(29, 7, 29, 12);
    irrgarten.punkte(29, 12, 26, 12);
    irrgarten.punkte(29, 15, 26, 15);
    irrgarten.punkte(29, 16, 29, 20);
    irrgarten.punkte(29, 22, 29, 26);
    irrgarten.punkte(28, 26, 26, 26);
    irrgarten.punkte(24, 26, 22, 26);
    irrgarten.punkte(22, 25, 22, 21);


    irrgarten.geradeWand( 28, 2, 26, 2, 'links'); // das  Rechteck darüber
    irrgarten.geradeWand( 26, 2, 26, 5, 'unten');
    irrgarten.geradeWand( 26, 5, 28, 5, 'rechts');
    irrgarten.geradeWand( 28, 5, 28, 2, 'oben');

    irrgarten.geradeWand( 28, 7, 26, 7, 'links'); // das  Rechteck rechts daneben
    irrgarten.geradeWand( 26, 7, 26, 11, 'unten');
    irrgarten.geradeWand( 26, 11, 28, 11, 'rechts');
    irrgarten.geradeWand( 28, 11, 28, 7, 'oben');

    irrgarten.geradeWand( 24, 22, 23, 22, 'links'); // das  - auf der rechten Seite
    irrgarten.geradeWand( 23, 22, 23, 25, 'unten');
    irrgarten.geradeWand( 23, 25, 24, 25, 'rechts');
    irrgarten.geradeWand( 24, 25, 24, 22, 'oben');

    irrgarten.geradeWand( 28, 22, 26, 22, 'links'); // das  Rechteck darüber
    irrgarten.geradeWand( 26, 22, 26, 25, 'unten');
    irrgarten.geradeWand( 26, 25, 28, 25, 'rechts');
    irrgarten.geradeWand( 28, 25, 28, 22, 'oben');

    irrgarten.geradeWand( 28, 16, 26, 16, 'links'); // das  Rechteck links daneben
    irrgarten.geradeWand( 26, 16, 26, 20, 'unten');
    irrgarten.geradeWand( 26, 20, 28, 20, 'rechts');
    irrgarten.geradeWand( 28, 20, 28, 16, 'oben');

    irrgarten.punkte(25, 1, 25, 26); // über dem |- und T oben

    irrgarten.geradeWand( 20, 16, 21, 16, 'links'); // das  -| rechts
    irrgarten.geradeWand( 21, 16, 21, 18, 'oben');
    irrgarten.geradeWand( 22, 18, 24, 18, 'rechts');
    irrgarten.geradeWand( 24, 19, 24, 20, 'oben');
    irrgarten.geradeWand( 24, 20, 17, 20, 'rechts');
    irrgarten.geradeWand( 17, 20, 17, 19, 'unten');
    irrgarten.geradeWand( 17, 19, 19, 19, 'links');
    irrgarten.geradeWand( 20, 18, 20, 16, 'unten');


    irrgarten.punkte(1, 12, 4, 12);
    irrgarten.punkte(4, 11, 4, 9);
    irrgarten.punkte(5, 9, 7, 9);
    irrgarten.punkte(7, 10, 7, 18);
    irrgarten.punkte(6, 18, 4, 18);
    irrgarten.punkte(4, 17, 4, 15);
    irrgarten.punkte(3, 15, 2, 15);

    irrgarten.geradeWand( 2, 15, 3, 15, 'rechts'); // t umgedreht unten rechts
    irrgarten.geradeWand( 3, 16, 3, 18, 'oben');
    irrgarten.geradeWand( 4, 19, 6, 19, 'links');
    irrgarten.geradeWand( 6, 19, 6, 20, 'oben');
    irrgarten.geradeWand( 6, 20, 4, 20, 'rechts');
    irrgarten.geradeWand( 3, 21, 3, 25, 'oben');
    irrgarten.geradeWand( 3, 25, 2, 25, 'rechts');
    irrgarten.geradeWand( 2, 25, 2, 16, 'unten');
    irrgarten.punkte(7, 19, 7, 21);
    irrgarten.punkte(6, 21, 4, 21);
    irrgarten.punkte(4, 22, 4, 26);
    irrgarten.punkte(3, 26, 2, 26);


    irrgarten.punkte(5, 24, 7, 24);
    irrgarten.punkte(7, 25, 7, 26);
    irrgarten.punkte(8, 26, 10, 26);
    irrgarten.punkte(10, 25, 10, 21);
    irrgarten.punkte(9, 21, 8, 21);

    irrgarten.geradeWand( 5, 22, 5, 23, 'unten'); // L rechts unten
    irrgarten.geradeWand( 5, 23, 7, 23, 'rechts');
    irrgarten.geradeWand( 8, 24, 8, 25, 'unten');
    irrgarten.geradeWand( 8, 25, 9, 25, 'rechts');
    irrgarten.geradeWand( 9, 25, 9, 22, 'oben');
    irrgarten.geradeWand( 9, 22, 5, 22, 'links');

    irrgarten.geradeWand( 8, 20, 9, 20, 'rechts'); // minus rechts unten
    irrgarten.geradeWand( 9, 20, 9, 16, 'oben');
    irrgarten.geradeWand( 9, 16, 8, 16, 'links');
    irrgarten.geradeWand( 8, 16, 8, 20, 'unten');

    irrgarten.geradeWand( 5, 3, 7, 3, 'rechts');
    irrgarten.punkte(4, 3, 7, 3);


    irrgarten.geradeWand( 7, 3, 7, 2, 'oben');
    irrgarten.punkte(7, 3, 7, 1);


    irrgarten.geradeWand( 8, 1, 9, 1, 'rechts');
    irrgarten.punkte(7, 1, 10, 1);


    irrgarten.geradeWand( 10, 2, 10, 5, 'unten');
    irrgarten.geradeWand( 10, 7, 10, 11, 'unten');
    irrgarten.punkte(10, 1, 10, 12);

    irrgarten.geradeWand( 9, 6, 5, 6, 'links');
    irrgarten.geradeWand( 9, 6, 8, 6, 'rechts');


    irrgarten.geradeWand( 7, 7, 7, 11, 'oben');
    irrgarten.geradeWand( 8, 12, 9, 12, 'links');
}



export default {start};
