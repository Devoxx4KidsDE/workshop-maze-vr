
import THREE from 'three';
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

        const texture = new THREE.TextureLoader ().load (`textures/${textureName}`);
        texture.anisotropy = 1;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        const material = new THREE.MeshBasicMaterial ({
            map: texture,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh (new THREE.PlaneBufferGeometry (cellSize, cellSize, 1, 1), material);
        this.mesh.rotation.y = (orientation === 'left' || orientation === 'right') ? 0 : Math.PI / 2;
        this.mesh.position.x = (this.x * cellSize) + (cellSize / 2) + offsize.x;
        this.mesh.position.z = (this.z * cellSize) + (cellSize / 2) + offsize.z;

        switch (orientation) {
            case 'right', 'rechts', '0':
                this.mesh.position.z -= 1;
                break;
            case 'left', 'links', '1':
                this.mesh.position.z += 1;
                break;
            case 'front', 'oben', '2':
                this.mesh.position.x -= 1;
                break;
            case 'back', 'unten', '3':
                this.mesh.position.x += 1;
                break;
        }
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

function erzeugen (x, z, orientation, muster, cellSize = 500) {
    return create({x,z, orientation: orientation, texture : muster}, cellSize);
}


export default {create, erzeugen};
