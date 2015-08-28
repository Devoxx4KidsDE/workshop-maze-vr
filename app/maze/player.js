import * as THREE from './../libs/three.js';

class Player {
    constructor() {
        this.name = undefined;
        this.skills = {
            speed: 1
        };
        this.body = undefined;
        this.position = {
            x: undefined,
            y: undefined,
            z: undefined
        };
    }
}

function create(name, {x,y,z}, {width = 100, height = 100, depth = 100}) {
    let player = new Player();

    player.name = name;

    player.position.x = x;
    player.position.y = y;
    player.position.z = z;

    player.body = new THREE.BoxGeometry(width, height, depth);

    return player;
}

export {create}