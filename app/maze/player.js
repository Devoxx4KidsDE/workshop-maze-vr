class Player {
    constructor() {
        this.name = undefined;
        this.speed = undefined;
        this.position = {
            x: undefined,
            y: undefined,
            z: undefined
        };
    }
}

function create(name = "HoBeTo", speed=1, {x=0,y=0,z=0}) {
    let player = new Player();

    player.name = name;
    player.speed = speed;
    player.position.x = x;
    player.position.y = y;
    player.position.z = z;

    return player;
}

export default {create}
