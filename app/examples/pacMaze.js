/* eslint no-unused-vars: "off" */
//Facade using a Pac Maze

import Irrgarten from '../facade/irrgarten';

import zeichnePacmanLabyrinth from './worlds/pacmanWorld';

function start() {

    const irrgarten = new Irrgarten(31,28);

    zeichnePacmanLabyrinth(irrgarten); // unser Pacman Labyrinth

    irrgarten.neuerSpieler('Pac ', 1, 1);

    // Aufgabe 1: Zeichne Portal an die Stellen, wo die gelben Wände sind (siehe pacman)

    // Uns sollen auch die anderen Spieler sehen
    irrgarten.starteMultiplayer();

    // Aufgabe 2: Zeichne alle Würfel im Labyrinth im unteren Gang




    irrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}


export default {start};
