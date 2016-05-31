/* eslint no-unused-vars: "off" */

export default { build }
export function build (Maze, Player, Wall, Item, WallTexture) {

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

    const simple_wall_front = Wall.create({x: 1, z: 2, orientation: 'front'});
    const simple_wall_right = Wall.create({x: 1, z: 2, orientation: 'right'});
    const simple_wall_back = Wall.create({x: 1, z: 2, orientation: 'back'});
    maze.addWall(simple_wall_front);
    maze.addWall(simple_wall_right);
    maze.addWall(simple_wall_back);

    const portal = Wall.create({x: 3, z: 0, orientation: 'back'});
    portal.setTexture(WallTexture.GATE);
    portal.isPortalTo({x: 2, z: 0});
    maze.addWall(portal);

    const hedge = Wall.create({x: 3, z: 0, orientation: 'right'});
    hedge.setTexture(WallTexture.HEDGE);
    maze.addWall(hedge);

    const lamp = Wall.create({x: 3, z: 0, orientation: 'front'});
    lamp.setTexture(WallTexture.LAMP);
    maze.addWall(lamp);

    return maze;
}
