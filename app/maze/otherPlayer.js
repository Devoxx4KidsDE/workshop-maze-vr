
import THREE from 'three';

class OtherPlayer {
    constructor({ x, z }, id, color= "rgb(0,0,255)") {
        this.id = id;
        this.x = x;
        this.y = 0;
        this.z = z;

        this.position = {
          x,
          y: 0,
          z
        };


        const otherPlayerGeometry = new THREE.SphereGeometry(250, 32, 32);
        const otherPlayerMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(color) , wireframe: true});
        const sphere = new THREE.Mesh( otherPlayerGeometry, otherPlayerMaterial );

        this.mesh = sphere;
    }

    setPosition({ x, z }) {
      this.position.x = x;
      this.position.z = z;
    }
}

function create(position, id, color) {
    return new OtherPlayer(position, id, color);
}

export default {create};
