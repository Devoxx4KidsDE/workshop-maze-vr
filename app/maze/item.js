import * as THREE from './../libs/three';

class Item {
    constructor() {
        this.name = undefined;
        this.geometry = undefined;
        this.collected = undefined;

        var isCollected = false;

        Object.defineProperty (this, 'isCollected', {
            set (value) {
                isCollected = value;
                if (value && this.onCollectListener) {
                    this.onCollectListener ();
                }
            },
            get () { return isCollected; }
        });
    }

    onCollect (listener) {
        this.onCollectListener = listener;
    }
}

function create(name,
                geometry,
                isCollected = false) {
    let item = new Item();

    item.name = name;
    item.geometry = geometry;
    item.isCollected = isCollected;

    return item;
}

function createCube({x, z, displayName, color = 0x00ff00}) {
    let cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );
    let cubeMaterial = new THREE.MeshBasicMaterial( { color: color } );
    let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = x;
    cube.position.y = 0;
    cube.position.z = z;

    return create(displayName, cube);
}

function createFireball({x, z, displayName}) {
    let fireballGeometry = new THREE.SphereGeometry(100);
    let fireballMaterial = new THREE.MeshBasicMaterial({map: new THREE.ImageUtils.loadTexture('textures/fire_texture.jpg')});
    let fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);

    fireball.position.x = x;
    fireball.position.y = 0;
    fireball.position.z = z;

    return create(displayName, fireball);
}

export default {createCube, createFireball}
