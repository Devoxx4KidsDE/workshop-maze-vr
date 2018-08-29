//Facade using a Pac Maze

import Irrgarten from '../facade/irrgarten';

import zeichnePacmanLabyrinth from './worlds/pacmanWorld';

var irrgarten;

var punkte = 0;

function start() {

    irrgarten = new Irrgarten(31,28);

    zeichnePacmanLabyrinth(irrgarten); // unser Pacman Labyrinth

    irrgarten.neuerSpieler('Pac ', 1, 1);

    // Aufgabe 1: Zeichne Portal an die Stellen, wo die gelben Wände sind (siehe pacman)
    irrgarten.neuesPortal(16,1,'links',16,26);
    irrgarten.neuesPortal(16,26,'rechts',16,1);


    // Aufgabe 2: Zeichne alle Würfel im Labyrinth im unteren Gang
    //
    // a) Was ist gleich bei allen Würfeln? Was unterscheidet alle Würfel in den Koordinaten?
    //
    // b) Was kann man tun, damit man nicht 27 Würfel einzelnen bauen muss? (lass dir von deinem Mentor helfen)
    //
    //
    //
    // Aufgabe 3: Erweitere Aufgabe 2 mit onCollect auf dem Würfel und spiele einen Sound
    //            wenn einer deiner Würfel gefressen wird.
    //            OnCollect = "Wenn Aufsammeln"
    //
    //      wuerfel.onCollect(spieleFressenTonAb);
    //
    //  "spieleFressenSoundAb" ist eine function. Funktionen sind Codeblöcke, die wir immer wieder verwenden können.
    //  Die leere function aktionWuerfelGefressen sieht so aus
    //
    //     function aktionWuerfelGefressen() {
    //
    //     }
    //
    //  Sie wird ganz am Ende unseres bisherigen Codes geschrieben.
    //
    //  Zum Abspielen des Sound kannst du folgenden Code benutzen:
    //
    //        new Audio('./sounds/pacmanFressen.wav').play();
    //
    //  Diese Zeile musst du in die leere Funktion einbauen.
    //
    //     Hinweis: Damit Sound in Chrome funktioniert, muss unbedingt
    //     chrome://flags#autoplay-policy
    //     auf "no user gesture required" gesetzt wird, damit der Sound
    //     auf dem Handy auch abgespielt wird.

    for (var z = 1; z <= 26; z++) {

        var wuerfel = irrgarten.neuerWuerfel(1,z, 'Würfel');

        // Aufgabe 3
        wuerfel.onCollect(aktionWuerfelGefressen);

    }

    // Aufgabe 4: Immer wenn ein Wuerfel gefressen wird, zähle die Variable "punkte" um eins hoch
    //
    //            Tipp die Variable muss "global" sein
    //
    //            Benutze
    //
    //                    irrgarten.schreibeText (abstandVonLinks, abstandVonOben, punkte)
    //
    //            um die Variable "punkte" auszugeben

    // Aufgabe 5: Zeichne einen Feuerball etwa in der Mitte des Labyrinth (im Mittel-Raum) 16,14

    var feuerball = irrgarten.neuerFeuerball(15,14, 'Spiel Ende');

    // Aufgabe 6: Verwende onCollect auf dem Feuerball
    //
    //  feuerball.onCollect( );
    //
    //  - Schreibe eine function, die aktionAmEnde heißt.
    //
    //  - mit folgender Zeile kannst du einen Text schreiben
    //
    //         irrgarten.schreibeText (abstandVonLinks, abstandVonOben, deinText)
    //
    //   schreibe damit das Wort "GEWONNEN", so dass der Text erscheint, wenn der Feuerball gefunden wurde.
    //
    //   Nun trage die aktionAmEnde  in onCollect ein, damit die function aufgerufen, wenn du den Feuerball
    //   aufrufst
    //
    //   Aufgabe 6: Spiele den Sound pacmanFressen.wav  , wenn der Feuerball gefunden wurde
    //


    feuerball.onCollect(aktionAmEnde);


    // Uns sollen auch die anderen Spieler sehen
    irrgarten.starteMultiplayer();

    irrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}

function aktionWuerfelGefressen() {
    new Audio('./sounds/pacmanFressen.mp3').play();
    punkte++;
    irrgarten.schreibeText(100, 100, punkte);
}

function aktionAmEnde() {
    irrgarten.schreibeText(620, 300, 'ENDE');

    // Aufgabe 6
    new Audio('./sounds/pacmanEnde.mp3').play();

}

export default {start};
