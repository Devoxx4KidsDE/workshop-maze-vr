import * as Wall from './../maze/wall.js';
import * as Maze from './../maze/mazen.js';

function load(name) {
    return fetch('configuration/' + name + '.json').then(mazeConfigurationResponse => {

        return mazeConfigurationResponse.json().then(mazeConfiguration => {
            let maze = Maze.create({
                length: mazeConfiguration.length,
                width: mazeConfiguration.width,
                cellSize: mazeConfiguration.cellSize
            });

            let walls = mazeConfiguration.walls.map((w, i) => {
                w = Object.assign(w);
                w.texture = i % 2 ? 'wall' : 'wall_d4k';
                return Wall.create(w, mazeConfiguration.cellSize);
            });

            maze.addWalls(walls);

            return maze;
        });
    });
}

export {load}