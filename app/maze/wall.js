import * as THREE from '../libs/three';
import {STONE as DefaultTexture} from './wallTexture';

function calculateOffsize (orientation, cellSize) {

    var x = 0;
    var z = 0;

    switch (orientation) {
        case 'front':
            x = cellSize / 2;
            break;
        case 'back':
            x = -cellSize / 2;
            break;
        case 'left':
            z = -cellSize / 2;
            break;
        case 'right':
            z = cellSize / 2;
    }

    return {x, z};
}

class WallPrototype {

    constructor ({x, z, orientation}, cellSize) {

        this.x           = x;
        this.z           = z;
        this.orientation = orientation;
        this.cellSize    = cellSize;

    }

    triggerCollision () {
        return this._portalTo ? this._portalTo : {};
    }

    isPortalTo (point) {
        this._portalTo = point;
    }

    setTexture (textureName) {
        if    (!textureName) throw new TypeError ('textureName must be defined.');

        const cellSize    = this.cellSize;
        const orientation = this.orientation;
        const offsize     = calculateOffsize (orientation, cellSize);

        const texture = THREE.ImageUtils.loadTexture (`../textures/${textureName}`);
        texture.minFilter = THREE.LinearFilter;

        const material = new THREE.MeshBasicMaterial ({
            map: texture,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh (new THREE.PlaneBufferGeometry (cellSize, cellSize, 1, 1), material);
        this.mesh.rotation.y = (orientation === 'left' || orientation === 'right') ? 0 : Math.PI / 2;
        this.mesh.position.x = (this.x * cellSize) + (cellSize / 2) + offsize.x;
        this.mesh.position.z = (this.z * cellSize) + (cellSize / 2) + offsize.z;
    }

    getMesh () {
        return this.mesh;
    }
}

function create ({x, z, orientation, texture = DefaultTexture}, cellSize = 500) {

    const wall = new WallPrototype ({x, z, orientation}, cellSize);

    wall.setTexture (texture);

    return wall;
}

export default {create};
