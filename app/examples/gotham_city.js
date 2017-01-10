/*

 o   Bruce
 x   item
 >|  portal

 +---+---+---+---+---+---+
 |        ___|    ___    |
 |   |   |  >|   | x |   |
 |_x_    |___    |___|   |
 |           |    ___|   |
 |   |   |___|___|       |
 | o |               |   |
 +---+---+---+---+---+---+

 */

import Maze             from './../maze/mazen';
import Player           from './../maze/player';
import Wall             from './../maze/wall';
import Item             from './../maze/item';
import * as WallTexture from './../maze/wallTexture';

function start() {

    const maze = Maze.create({
        length: 6,
        width: 6
    });

    const player = Player.create({
        name: 'Bruce Wayne',
        startPoint: {x: 0, z: 0}
    });

    const explosive = Item.createFireball({x: 3, z: 0, displayName: 'explosive'});
    explosive.onCollect(function () {
        const speed = player.speed;
        player.speed *= 5;
        setTimeout(() => player.speed = speed, 3 * 1000);
    });

    const batmobile = Item.createCube({x: 4, z: 4, displayName: 'batmobile'});

    const portal = Wall.create({x: 4, z: 2, orientation: 'right', texture: WallTexture.GATE});
    portal.isPortalTo({x: 3, z: 4});

    const portalBack = Wall.create({x: 3, z: 4, orientation: 'back', texture: WallTexture.GATE});
    portalBack.isPortalTo({x: 0, z: 0});

    maze.addItem(explosive);
    maze.addItem(batmobile);

    maze.addWall(portal);
    maze.addWall(portalBack);
    maze.addWall({x: 0, z: 0, orientation: 'right'});
    maze.addWall({x: 1, z: 0, orientation: 'right'});
    maze.addWall({x: 2, z: 0, orientation: 'front'});
    maze.addWall({x: 4, z: 1, orientation: 'right'});
    maze.addWall({x: 1, z: 1, orientation: 'right'});
    maze.addWall({x: 3, z: 1, orientation: 'right'});
    maze.addWall({x: 4, z: 1, orientation: 'right'});
    maze.addWall({x: 0, z: 2, orientation: 'front'});
    maze.addWall({x: 1, z: 2, orientation: 'right'});
    maze.addWall({x: 2, z: 2, orientation: 'right'});
    maze.addWall({x: 2, z: 2, orientation: 'front'});
    maze.addWall({x: 4, z: 2, orientation: 'front'});
    maze.addWall({x: 5, z: 2, orientation: 'right'});
    maze.addWall({x: 0, z: 3, orientation: 'front'});
    maze.addWall({x: 1, z: 3, orientation: 'right'});
    maze.addWall({x: 3, z: 3, orientation: 'right'});
    maze.addWall({x: 4, z: 3, orientation: 'right'});
    maze.addWall({x: 4, z: 3, orientation: 'left' });
    maze.addWall({x: 0, z: 4, orientation: 'right'});
    maze.addWall({x: 1, z: 4, orientation: 'front'});
    maze.addWall({x: 2, z: 4, orientation: 'right'});
    maze.addWall({x: 2, z: 4, orientation: 'front'});
    maze.addWall({x: 3, z: 4, orientation: 'right'});
    maze.addWall({x: 4, z: 4, orientation: 'right'});
    maze.addWall({x: 4, z: 4, orientation: 'front'});
    maze.addWall({x: 0, z: 5, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 1, z: 5, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 2, z: 5, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 3, z: 5, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 4, z: 5, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 5, z: 5, orientation: 'front', texture: WallTexture.HEDGE});
    maze.addWall({x: 5, z: 4, orientation: 'front', texture: WallTexture.HEDGE});
    maze.addWall({x: 5, z: 3, orientation: 'front', texture: WallTexture.HEDGE});

    maze.addPlayer(player);
    maze.start();
}

export default {start};
