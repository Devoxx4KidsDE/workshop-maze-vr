/**
 * Created by Stefan Höhn
 * Takes the parameters from the URL and exports them to be used
 *
 */

var playerName = "Ironman";
var playerColor = "rgb(255,0,0)";
var playerSpeed = 10;

function retrievePlayerParamsFromURL() {
    var params = window.location.search
        .substring(1)
        .split("&")
        .map(v => v.split("="))
        .reduce((map, [key, value]) => map.set(key, decodeURIComponent(value)), new Map());

    playerName = params.get("name");
    playerColor = params.get("color");
    playerSpeed = params.get("speed");
}

module.exports = {
    playerName,
    playerColor,
    playerSpeed,
    retrievePlayerParamsFromURL
}