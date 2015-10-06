class Player {
    constructor() {
        this.name = undefined;
        this.skills = {
            speed: 1,
            jump: 1
        };
        this.body = undefined;
        this.position = {
            x: undefined,
            y: undefined,
            z: undefined
        };
    }
}

function create(name, {x,y,z}, {width = 200, height = 500, depth = 200}) {
    let player = new Player();

    player.name = name;

    player.position.x = x;
    player.position.y = y;
    player.position.z = z;

    player.body = {width: width, height: height, depth: depth};

    return player;
}

export default {create}
