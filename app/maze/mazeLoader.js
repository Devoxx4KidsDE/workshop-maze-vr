import Wall from './wall';
import Maze from './mazen';
import Player from './player';
import * as WallTexture from './wallTexture';

function load(name) {
    return fetch('configuration/' + name + '.json').then(configurationResponse => {

        return configurationResponse.json().then(configuration => {
            const maze = Maze.create({
                length: configuration.length,
                width: configuration.width,
                cellSize: configuration.cellSize
            });

            const walls = configuration.walls.map((w, i) => {
                w = Object.assign(w);
                w.texture = i % 2 ? WallTexture.STONE : WallTexture.STONE_LAMP;
                return Wall.create(w, configuration.cellSize);
            });
            maze.addWalls(walls);

            const player = Player.create({name: configuration.player.name, speed: configuration.player.speed, startPoint: configuration.player.position});
            maze.addPlayer(player);

            return maze;
        });
    });
}

export default {load};
