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

function create ({name = 'Anonymous', speed = 5, startPoint = {x:0, z:0}}) {
    let player = new Player();

    player.name = name;
    player.speed = speed;
    player.position.x = startPoint.x;
    player.position.z = startPoint.z;
    player.position.y = 0;

    return player;
}

export default {create}
