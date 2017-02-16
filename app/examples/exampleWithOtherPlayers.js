/* eslint no-unused-vars: "off" */

import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import OtherPlayer from './../maze/otherPlayer';
import * as WallTexture from './../maze/wallTexture';

function start() {

    const maze = Maze.create({
        length: 10,
        width: 10
    });

    const player = Player.create({
        name: 'Bruce Wayne',
        startPoint: {x: 0, z: 0}
    });
    maze.addPlayer(player);

    const otherPlayer = OtherPlayer.create({x: 3, z: 0}, 'Hans');
    maze.addOtherPlayer(otherPlayer);

    setInterval(() => {
      otherPlayer.setPosition(otherPlayer.position.x + 0.1, otherPlayer.position.z + 0.1);
    }, 200);

    maze.start();
}

export default {start};
