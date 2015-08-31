class Player {
    constructor() {
        this.name = undefined;
        this.skills = {
            speed: 1
        };
        this.body = undefined;
        this.angle = {
            x: undefined,
            y: undefined,
            z: undefined
        };
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

    player.angle.x = 0;
    player.angle.y = 0;
    player.angle.z = 0;

    player.body = {width: width, height: height, depth: depth};

    return player;
}

export {create}