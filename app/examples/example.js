import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';

function start() {

    const maze = Maze.create({
        length: 10,
        width: 10
    });

    const player = Player.create({
        name: 'Bruce Wayne',
        startPoint: {x: 0, z: 0}
    });
    maze.addPlayer(player);

    const cube = Item.createCube({x: 0, z: 1, displayName: 'cube'});
    cube.onCollect(function () {
        player.speed = player.speed * 5;
    });

    const fireball = Item.createFireball({x: 1, z: 1, displayName: 'fireball'});
    fireball.onCollect(function () {
        const oldSpeed = player.speed;
        // player is burning and runs away in panic
        player.speed = player.speed * 3;
        // but calms down after 5 seconds
        setTimeout(() => player.speed = oldSpeed, 3 * 1000);
    });

    maze.addItem(cube);
    maze.addItem(fireball);

    maze.addWall({x: 1, z: 2, orientation: 'front'});
    maze.addWall({x: 1, z: 2, orientation: 'right'});
    maze.addWall({x: 1, z: 2, orientation: 'back' });
    maze.addWall({x: 3, z: 0, orientation: 'right', texture: WallTexture.HEDGE});
    maze.addWall({x: 3, z: 0, orientation: 'front', texture: WallTexture.LAMP});

    const portal = Wall.create({x: 3, z: 0, orientation: 'back'});
    portal.setTexture(WallTexture.GATE);
    portal.isPortalTo({x: 2, z: 0});
    maze.addWall(portal);

    maze.start();

}

export default {start};
