import * as Wall from './../maze/wall';
import * as Maze from './../maze/mazen';
import * as Player from './../maze/player';

function load(name) {
    return fetch('configuration/' + name + '.json').then(configurationResponse => {

        return configurationResponse.json().then(configuration => {
            let maze = Maze.create({
                length: configuration.length,
                width: configuration.width,
                cellSize: configuration.cellSize
            });

            let walls = configuration.walls.map((w, i) => {
                w = Object.assign(w);
                w.texture = i % 2 ? 'wall' : 'wall_d4k';
                return Wall.create(w, configuration.cellSize);
            });
            maze.addWalls(walls);

            let player = Player.create(configuration.player.name, configuration.player.position, {});
            maze.addPlayer(player);

            return maze;
        });
    });
}

export {load}