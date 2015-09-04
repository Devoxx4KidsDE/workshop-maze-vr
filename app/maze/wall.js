import * as THREE from '../libs/three';

function create({x,z,orientation,texture}, cellSize) {

    var offSizeX = 0;
    var offSizeZ = 0;

    switch (orientation) {
        case 'front':
            offSizeX = cellSize / 2;
            break;
        case 'back':
            offSizeX = -cellSize / 2;
            break;
        case 'left':
            offSizeZ = -cellSize / 2;
            break;
        case 'right':
            offSizeZ = cellSize / 2;
    }

    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(`../textures/${texture}.png`),
        side: THREE.DoubleSide
    });

    var wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(cellSize, cellSize, 1, 1), material);
    wall.rotation.y = (orientation === 'left' || orientation === 'right') ? 0 : Math.PI / 2;
    wall.position.x = (x * cellSize) + (cellSize / 2) + offSizeX;
    wall.position.z = (z * cellSize) + (cellSize / 2) + offSizeZ;

    return wall;
}

export {create};