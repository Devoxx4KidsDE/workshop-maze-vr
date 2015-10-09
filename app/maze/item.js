import * as THREE from './../libs/three';

class Item {
    constructor() {
        this.name = undefined;
        this.geometery = undefined;
        this.collected = undefined;
    }
}

function create(name,
                geometery,
                collected = false) {
    let item = new Item();

    item.name = name;
    item.geometery = geometery;
    item.collected = collected;

    return item;
}

function createCube(dimension = {width : 100, height: 100, depth: 100},
                    color = 0x00ff00,
                    position = {x: 0, y: 0, z: 1}) {

    let cubeGeometry = new THREE.BoxGeometry( dimension.width, dimension.height, dimension.depth );
    let cubeMaterial = new THREE.MeshBasicMaterial( { color: color } );
    let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;

    return create("cube", cube);
}

function createFireball(radius,
                        position = {x: 1, y: 0, z: 1}) {
    let fireballGeometry = new THREE.SphereGeometry(radius);
    let fireballMaterial = new THREE.MeshBasicMaterial({map: new THREE.ImageUtils.loadTexture('textures/fire_texture.jpg')});
    let fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);

    fireball.position.x = position.x;
    fireball.position.y = position.y;
    fireball.position.z = position.z;

    return create("fireball", fireball);
}

export default {createCube, createFireball}