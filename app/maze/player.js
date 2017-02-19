const toCameraPos = (playerPos, cellSize) => (
  (playerPos * cellSize) + (cellSize / 2)
);

const toPlayerPos = (camPos, cellSize) => (
  (camPos - (cellSize / 2)) / cellSize
);

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

    setPosition(pos) {
      this.position = pos;
      if (typeof this.onPositionChange === 'function') {
        this.onPositionChange(pos);
      }
    }

    getCameraPosition(cellSize) {
      return {
        x: toCameraPos(this.position.x, cellSize),
        y: 0,
        z: toCameraPos(this.position.z, cellSize)
      };
    }

    setPositionByCamera({ x, z }, cellSize) {
      this.setPosition({
        x: toPlayerPos(x, cellSize),
        y: 0,
        z: toPlayerPos(z, cellSize)
      });
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

export default {create};
