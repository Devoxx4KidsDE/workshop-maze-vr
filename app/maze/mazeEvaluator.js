
import Maze from './../maze/mazen';
import Player from './../maze/player';
import Wall from './../maze/wall';
import Item from './../maze/item';
import * as WallTexture from './../maze/wallTexture';

export function evaluate (functionBody) {

    const mazeBuilder = new Function (
        'Maze',
        'Player',
        'Wall',
        'Item',
        'WallTexture',
        functionBody
    );

    return mazeBuilder (Maze, Player, Wall, Item, WallTexture);
}
