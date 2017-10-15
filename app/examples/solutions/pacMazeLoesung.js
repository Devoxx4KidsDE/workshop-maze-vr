//Facade using a Pac Maze

import Irrgarten from '../facade/irrgarten';

import zeichnePacmanLabyrinth from './worlds/pacmanWorld';

function start() {

    const irrgarten = new Irrgarten(31,28);

    zeichnePacmanLabyrinth(irrgarten); // unser Pacman Labyrinth

    irrgarten.neuerSpieler('Pac ', 1, 1);

    // Aufgabe 1: Zeichne Portal an die Stellen, wo die gelben Wände sind (siehe pacman)
    irrgarten.neuesPortal(16,1,'links',16,26);
    irrgarten.neuesPortal(16,26,'rechts',16,1);


    // Aufgabe 2: Zeichne alle Würfel im Labyrinth im unteren Gang
    //
    // Aufgabe 3: Erweitere Aufgabe mit onCollect auf dem Würfel und spiele einen Sound
    //            wenn einer deiner Würfel gefressen wird.
    //            Zum Abspielen des Sound kannst du folgenden Code benutzen:
    //
    //            new Audio('./sounds/pacmanFressen.wav').play();
    //


     for (var z = 1; z <= 26; z++) {
     var wuerfel = irrgarten.neuerWuerfel(1,z, 'Würfel');

         // Aufgabe 3
         wuerfel.onCollect(function()
            {
                new Audio('./sounds/pacmanFressen.wav').play();
            }
         );
     }

    // Aufgabe 4: Zeichne einen Feuerball etwa in der Mitte des Labyrinth (im Mittel-Raum) 16,14

    var feuerball = irrgarten.neuerFeuerball(2,1, 'Spiel Ende');


    // Aufgabe 5: Verwende onCollect auf dem Feuerball
    //
    //  feuerball.onCollect(function()
    //      {
    //
    //       }
    // );
    //
    // Im Block {  } verwende die Methode irrgarten.schreibeText (posVonLinks, posVonOben, deinText) und
    // schreibe damit "ENDE", damit der Text erscheint, wenn der Feuerball gefunden wurde.
    //
    // Aufgabe 6: Spiele den Sound pacmanFressen.wav  , wenn der Feuerball gefunden wurde
    //


    feuerball.onCollect(function() {
        irrgarten.schreibeText(620, 300, 'ENDE');

        // Aufgabe 6
        new Audio('./sounds/pacmanEnde.wav').play();
    });



    // Uns sollen auch die anderen Spieler sehen
    irrgarten.starteMultiplayer();

    irrgarten.start(); // nicht vergessen, dass der Irrgarten einen Spieler braucht
}


export default {start};
