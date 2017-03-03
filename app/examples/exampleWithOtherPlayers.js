/* eslint no-unused-vars: "off" */

import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';
import MultiPlayerController from '../multiplayer/controller';
//import * as Parameter from '../maze/playerParams';

function start() {
    var params = window.location.search
        .substring(1)
        .split("&")
        .map(v => v.split("="))
        .reduce((map, [key, value]) => map.set(key, decodeURIComponent(value)), new Map());

    var name = params.get("name");
    var color = params.get("color");
    var speed = params.get("speed");


    const maze = Maze.create({
        length: 10,
        width: 10
    });

    var playerName1 = (name === undefined) ? "Bruce Wayne" : name;
    var playerColor1 = (color === undefined) ? "rgb(255,0,255)" : color;
    var playerSpeed1 = (speed === undefined) ? 5 : speed;


    console.log("playercolor1="+playerColor1)

//    console.log("playercolor="+Parameter.playerColor)

//    Parameter.retrievePlayerParamsFromURL();

//    console.log("playercolor="+Parameter.playerColor)

    const player = Player.create({
        name: playerName1,
        startPoint: {x: 0, z: 0},
        color: playerColor1,
        speed: playerSpeed1
    });

    maze.addPlayer(player);

    // Connect to server
    const multiplayer = new MultiPlayerController(maze, `ws://${window.location.host}/players`);

    maze.start();
}

export default {start};
