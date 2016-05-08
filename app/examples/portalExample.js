import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';

function start () {

    const maze = Maze.create({
        length: 5,
        width: 5
    });

    const player = Player.create({
        name: 'Chell',
        startPoint: {x: 0, z: 0}
    });
    maze.addPlayer(player);

    const cubeRed = Item.createCube({x: 4, z: 3, displayName: 'cubeRed', color : 'red'});
    cubeRed.onCollect(function () {
        player.speed = player.speed * 0.5;
    });
    maze.addItem(cubeRed);

    const cubeGreen = Item.createCube({x: 0, z: 1, displayName: 'cubeGreen', color : 'green'});
    cubeGreen.onCollect(function () {
        player.speed = player.speed * 5;
    });
    maze.addItem(cubeGreen);

    const cubeBlue = Item.createCube({x: 3, z: 2, displayName: 'cubeBlue', color : 'blue'});
    cubeBlue.onCollect(function () {
        player.speed = 1;
    });
    maze.addItem(cubeBlue);

    maze.addWall({x: 0, z: 0, orientation: 'right'});
    maze.addWall({x: 1, z: 0, orientation: 'right'});
    maze.addWall({x: 2, z: 0, orientation: 'right'});
    maze.addWall({x: 3, z: 0, orientation: 'right'});
    maze.addWall({x: 4, z: 1, orientation: 'right'});
    maze.addWall({x: 4, z: 1, orientation: 'right'});
    maze.addWall({x: 4, z: 1, orientation: 'back'});
    maze.addWall({x: 4, z: 3, orientation: 'back'});
    maze.addWall({x: 4, z: 3, orientation: 'left'});
    maze.addWall({x: 3, z: 2, orientation: 'back'});
    maze.addWall({x: 3, z: 3, orientation: 'back'});
    maze.addWall({x: 3, z: 4, orientation: 'back'});
    maze.addWall({x: 2, z: 2, orientation: 'back'});
    maze.addWall({x: 2, z: 3, orientation: 'back'});
    maze.addWall({x: 2, z: 4, orientation: 'back'});
    maze.addWall({x: 0, z: 1, orientation: 'right'});
    const portal1 = Wall.create({x: 4, z: 0, orientation: 'right'});
    portal1.setTexture(WallTexture.GATE);
    portal1.isPortalTo({x: 4, z: 2});
    maze.addWall(portal1);

    const portal2 = Wall.create({x: 1, z: 1, orientation: 'front'});
    portal2.setTexture(WallTexture.GATE);
    portal2.isPortalTo({x: 0, z: 2});
    maze.addWall(portal2);

    const portal3 = Wall.create({x: 0, z: 2, orientation: 'right'});
    portal3.setTexture(WallTexture.GATE);
    portal3.isPortalTo({x: 0, z: 0});
    maze.addWall(portal3);

    maze.start();

}

export default {start};
