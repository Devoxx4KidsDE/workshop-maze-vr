import Wall from './../maze/wall';
import Maze from './../maze/mazen';
import Player from './../maze/player';
import * as WallTexture from './wallTexture';

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
                w.texture = i % 2 ? WallTexture.STONE : WallTexture.STONE_LAMP;
                return Wall.create(w, configuration.cellSize);
            });
            maze.addWalls(walls);

            let player = Player.create(configuration.player.name, configuration.player.position, {});
            maze.addPlayer(player);

            return maze;
        });
    });
}

export default {load}
