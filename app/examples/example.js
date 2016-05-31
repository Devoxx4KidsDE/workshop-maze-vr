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

    // maze.addWall(Wall.create({x: 0, z: 0, orientation: 'right'}));
    // maze.addWall(Wall.create({x: 1, z: 0, orientation: 'right'}));
    // maze.addWall(Wall.create({x: 2, z: 0, orientation: 'right'}));


    return maze;
}
