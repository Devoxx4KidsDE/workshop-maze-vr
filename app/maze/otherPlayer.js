
import THREE from 'three';

class OtherPlayer {
    constructor({ x, z }, id) {
        this.id = id;
        this.x = x;
        this.y = 0;
        this.z = z;

        this.position = {
          x,
          y: 0,
          z
        };

        const otherPlayerGeometry = new THREE.SphereGeometry(100);
        const otherPlayerMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader ().load ('textures/player_texture.jpg')});
        const mesh = new THREE.Mesh(otherPlayerGeometry, otherPlayerMaterial);

        this.mesh = mesh;
    }

    setPosition({ x, z }) {
      this.position.x = x;
      this.position.z = z;
    }
}

function create(position, id) {
    return new OtherPlayer(position, id);
}

export default {create};