![Devoxx4Kids](http://www.devoxx4kids.de/wp-content/uploads/2015/07/cropped-header_hp.jpg)

[![devDependency Status](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr/dev-status.svg)](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr#info=devDependencies)


# Devoxx4Kids Workshop - Maze VR

Entwickelt für einen devoxx4kids Workshop um Kindern das objektorientierte Programmieren
zu zeigen und anzuschauen wie ihr Labyrinth in virtual reality aussieht.

![stereoscopic view](https://raw.githubusercontent.com/Devoxx4KidsDE/workshop-maze-vr/master/presentation/screenshot-splitscreen.png)

Es gibt sogar einen Editor mit dem du dein Labyrinth online bauen kannst.

➡ http://devoxx4kidsde.github.io/workshop-maze-vr/build/?editor=true

und... (drum roll) - die neueste Version unterstützt *Multiplayer*!

# Anleitung

## Es gibt 2 verschiedene Workshops

Das Projekt enthält 2 verschiedene Workshops, welche beide Vorteile und Nachteile haben.
Einfach beide anschauen und aussuchen welchen man mehr mag.

_1) Ein "objektorientiertes Programmieren" Workshop_

* Es ist "näher" an der realen Javascript Sprache 
* Er benutzt englische Programmier Kommandos
* Der Workshop ist hauptsächlich Verfügbar im open office Format und PDF
* Gefunden wird er unter presentation/de/workshop 1

_2) Eine simplere Version für jüngere Kinder_

* Der Code ist simpler aber weniger objekt Orientiert
* Man versucht eher das echte Javascript zu verstecken als es zu zeigen
* Es werden Deutsche Kommandos benutzt
* Es ist nur Verfügbar in Powerpoint und PDF
* Gefunden wir er unter presentation/de/workshop 2

### wie man eine neue Sprache für Fassaden in Workshop 2 hinzufügt

1. erstelle ein neues js file im Ordner facade
1. fülle das File mit einer facade in der neuen Sprache (die Basis kann Deutsch (irrgarten.js)   oder Englisch (labyrinth.js) sein)
1. Die neue Übersetzung muss auch in maze/wall.js hinzugefügt werden:
    1. Für die Orientierung der Wände muss man die neue Übersetzung zur Funktion 
       mapOrientation hinzufügen
    1. Für das neue Kommando eine Wand zu kreieren muss man ene neue Funktion mit der neuen
       Übersetzung hinzufügen. Siehe function erzeugen oder generate
1. Um die neue facade zu nutzen muss du diese in dein Beispiel hinzufügen (Siehe exampleWithFacade.js)

## Anforderung

* Installiere NodeJS Version 6.x
* Siehe https://nodejs.org/en/download/package-manager/ für mehr Information

## Start

Einfach das Repository klonen

```
git clone https://github.com/Devoxx4KidsDE/workshop-maze-vr.git
```
Installiere alle abhänigkeiten

```
cd workshop-maze-vr
npm install
```
Und sobald die Abhänigkeiten installiert sind, einfach die App starten mit:

```
npm start
```
oder tippe diesen Kommando ,wenn du willst das der Server sich automatisch neu Startet, wenn
du den Code änderst:

```
npm run start:watch
```
Das Labyrinth ist nun Verfügbar unter http://localhost:8080/

## Hacke dein Labyrinth

Du frägst dich wie du dein eigenes Labyrinth erstellen kannst?

1. Der einfachste Weg wäre `app/examples/example.js` zu öffnen und anzufangen :-)
2. Eine zweite Option wäre ein neues File (e.g. `app/examples/myAwesomeMaze.js`) zu erstellen
   und `app/app.js` anzupassen, dass es das korrekte File öffnet. Das muss für **Workshop 2**
   gemacht werden, da es 
   `app/examples/blank.js` als start Punkt oder `app/examples/germanExampleWithFacade.js` als Ergebnis nutzt.
3. Um zu lernen wie man Wände und Portale erstellt siehe [presentation handout workshop 1](https://github.com/Devoxx4KidsDE/workshop-maze-vr/blob/master/presentation/de/workshop1/workshop-maze-vr_handout_ger.pdf) oder [presentation handout workshop 2](https://github.com/Devoxx4KidsDE/workshop-maze-vr/blob/master/presentation/de/workshop2/workshop2-maze-vr_handout_ger.pdf).
  * Es wird empfohlen das Limit der Größe der images auf ca. 100K zu setzen, da es 
    rendering massiv verbessert. Vor allem auf mobilen Geräten.

# Notizen / Tipps

Das Labyrinth in einem simplen text Editoren zu bauen kann nervig werden.
Syntax Fehler und dessen Freunde werden nicht bemerkt bis die Applikation im Browser läuft.
Daher kann man ein linting Tool nutzen [eslint](https://github.com/eslint/eslint).
Dieses Tool analysiert den Code und druckt diese Fehler ins Terminal.

```
npm run lint
```
Du willst warscheinlich nicht während dem Bauen immer wieder diesen Task starten. Daher kannst du einen anderen npm Task startetn, welcher das linting Tool nach dem Speichern einer Datei
 aktiviert.

```
npm run lint:watch
```
Nun solltest du nach dem Speichern einer Datei auf das Terminal schauen. Wenn du einen Fehler
wie unten siehst, solltest du diesen zuerst reparieren.

Wenn du keine Fehler hast lade den Browser neu.

_(Die folgende Fehlermeldung ist ein Beispiel für einen unerwarteten Doppelpunkt welcher
in dem File `example.js` in Line 18 column 27 entfernt werden sollte)_

```
> devoxx4kids-workshop-maze-vr@1.0.0 lint /devoxx4kids/workshop-maze-vr
> eslint ./app


/devoxx4kids/workshop-maze-vr/app/examples/example.js
  18:27  error  Parsing error: Unexpected token ,

✖ 1 problem (1 error, 0 warnings)
```
# Abhängigkeiten

Dieses Projekt basiert auf: 
* [three.js](http://threejs.org/)
* [threeVR](https://github.com/richtr/threeVR)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [Maze3D](https://github.com/agar3s/maze3D)

Habt so viel Spaß wie es wir haben! 
