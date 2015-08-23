
import wallsdata from './walls.js';
import * as wall from './maze/wall.js';
import * as maze from './maze/maze.js';

const walls = wallsdata.map ((w,i) => {
    w = Object.assign (w);
    w.texture = i % 2 ? 'wall' : 'wall_d4k';
    return wall.create (w);
});

maze.init (walls);

