
import THREE from 'three';

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

    setCollected(value) {
      this.isCollected = value;
    }

    setVisibility(value) {
      this.geometry.visible = value;
    }

    onCollect (listener) {
        this.onCollectListener = listener;
    }
}

function create(name,
                geometry,
                isCollected = false) {
    const item = new Item();

    item.name = name;
    item.geometry = geometry;
    item.isCollected = isCollected;

    return item;
}

function createCube({x, z, displayName, color = "#00ff00"}) {
    const cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );
    const cubeMaterial = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = x;
    cube.position.y = 0;
    cube.position.z = z;

    return create(displayName, cube);
}

function createFireball({x, z, displayName}) {
    const fireballGeometry = new THREE.SphereGeometry(100);
    const fireballMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader ().load ('textures/fire_texture.jpg')});
    const fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);

    fireball.position.x = x;
    fireball.position.y = 0;
    fireball.position.z = z;

    return create(displayName, fireball);
}

export default {createCube, createFireball};
