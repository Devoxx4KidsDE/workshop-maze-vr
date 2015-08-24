import wallsData from './walls.js';
import * as wall from './maze/wall.js';
import * as maze from './maze/maze.js';
import * as THREE from './libs/three.js';

const walls = wallsData.map((w, i) => {
    w = Object.assign(w);
    w.texture = i % 2 ? 'wall' : 'wall_d4k';
    return wall.create(w);
});

var options = {length: 4, width: 4, cellSize: 500};
maze.create(options);
maze.init(options, {x: 1, z: 1});
//maze.addWalls(walls, options);
maze.addItem(
    new THREE.Mesh(
        new THREE.SphereGeometry(75, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 'yellow'
        })
    ),
    {x: 0, y: 0, z: 0},
    'ball',
    options
);
