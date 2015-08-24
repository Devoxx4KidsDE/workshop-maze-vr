import wallsData from './walls.js';
import * as wall from './maze/wall.js';
import * as maze from './maze/maze.js';
import * as THREE from './libs/three.js';

const walls = wallsData.map((w, i) => {
    w = Object.assign(w);
    w.texture = i % 2 ? 'wall' : 'wall_d4k';
    return wall.create(w);
});

var options = {length: 15, width: 9, cellSize: 500};
maze.create(options);
maze.addWalls(walls, options);
maze.addItem(
    new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshBasicMaterial({
            color: 'green'
        })
    ),
    {x: 0, y: 0, z: -1500},
    'cube'
);
maze.addItem(
    new THREE.Mesh(
        new THREE.SphereGeometry(75, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 'yellow'
        })
    ),
    {x: 1000, y: 0, z: 2000},
    'ball'
);
maze.init(options, {x: 2, z: 8});