
import wallsdata from './walls.js';
import * as wall from './maze/wall.js';
import * as maze from './maze/maze.js';

const walls = wallsdata.map (w => wall.create (w));

maze.init (walls);

