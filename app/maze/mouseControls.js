import * as THREE from './../libs/three.js';

const mouseMove = Symbol();
const PI_2 = Math.PI / 2;

/**
 * based on http://mrdoob.github.io/three.js/examples/misc_controls_pointerlock.html
 */
class MouseControls {
    constructor(camera) {

        camera.rotation.set(0, 0, 0);

        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(camera);

        this.yawObject = new THREE.Object3D();
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);

        this[mouseMove] = (event) => {

            const movementX = event.movementX || event.mozMovementX || 0;
            const movementY = event.movementY || event.mozMovementY || 0;

            this.yawObject.rotation.y -= movementX * 0.002;
            this.pitchObject.rotation.x -= movementY * 0.002;
            this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x));
        };

        document.addEventListener('mousemove', this[mouseMove], false);
    }

    getObject() {
        return this.yawObject;
    }

    getDirection() {
        // assumes the camera itself is not rotated
        const direction = new THREE.Vector3(0, 0, -1);
        const rotation = new THREE.Euler(0, 0, 0, "YXZ");

        return function (vector) {
            rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);
            vector.copy(direction).applyEuler(rotation);
            return vector;
        }
    }
}

function create(camera){
    return new MouseControls(camera);
}

export default {create}
