
import * as THREE from '../libs/three.js';


function create ({x,z,orientation,texture = 'wall'}) {

    const wall = {};

    wall.x = x;
    wall.z = z;
    wall.orientation = orientation;

    wall.material = new THREE.MeshBasicMaterial ({
        map : THREE.ImageUtils.loadTexture (`../textures/${texture}.png`),
        side: THREE.DoubleSide
    });

    return wall;
}

export {create};
