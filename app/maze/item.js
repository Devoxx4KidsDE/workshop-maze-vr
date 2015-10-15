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

function createCube(dimension = {width : 100, height: 100, depth: 100},
                    color = 0x00ff00,
                    position = {x: 0, y: 0, z: 1},
                    name = "cube") {

    let cubeGeometry = new THREE.BoxGeometry( dimension.width, dimension.height, dimension.depth );
    let cubeMaterial = new THREE.MeshBasicMaterial( { color: color } );
    let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;

    return create(name, cube);
}

function createFireball(radius,
                        position = {x: 1, y: 0, z: 1},
                        name = "fireball") {
    let fireballGeometry = new THREE.SphereGeometry(radius);
    let fireballMaterial = new THREE.MeshBasicMaterial({map: new THREE.ImageUtils.loadTexture('textures/fire_texture.jpg')});
    let fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);

    fireball.position.x = position.x;
    fireball.position.y = position.y;
    fireball.position.z = position.z;

    return create(name, fireball);
}

export default {createCube, createFireball}
