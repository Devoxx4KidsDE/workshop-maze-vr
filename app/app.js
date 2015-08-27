import wallsData from './walls.js';
import * as wall from './maze/wall.js';
import * as maze from './maze/maze.js';
import * as THREE from './libs/three.js';

var options = {length: 20, width: 10, cellSize: 500};

const walls = wallsData.map((w, i) => {
    w = Object.assign(w);
    w.texture = i % 2 ? 'wall' : 'wall_d4k';
    return wall.create(w, options.cellSize);
});

maze.create(options);
maze.init(options, {x: 1, z: 1});
maze.addWalls(walls);
maze.addItem(
    new THREE.Mesh(
        new THREE.SphereGeometry(75, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 'yellow'
        })
    ),
    {x: 0, z: 0},
    'ball',
    options
);