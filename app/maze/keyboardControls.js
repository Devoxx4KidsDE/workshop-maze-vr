import * as THREE from './../libs/three.js';

const keyDown = Symbol();
const keyUp = Symbol();

class KeyboardControls {
    constructor() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.velocity = new THREE.Vector3();
        this.prevTime = performance.now();

        this[keyDown] = (event) => {
            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    this.moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    this.moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    this.moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    this.moveRight = true;
                    break;

                case 32: // space
                    this.velocity.y += 500;
                    break;
            }
        };

        this[keyUp] = (event) => {
            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    this.moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    this.moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    this.moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    this.moveRight = false;
                    break;
            }
        };

        document.addEventListener('keydown', this[keyDown], false);
        document.addEventListener('keyup', this[keyUp], false);
    }

    update(yawCamera, skills) {
        const time = performance.now();
        const delta = ( time - this.prevTime ) / 250;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if (this.moveForward) this.velocity.z -= 400.0 * delta * skills.speed;
        if (this.moveBackward) this.velocity.z += 400.0 * delta * skills.speed;
        if (this.moveLeft) this.velocity.x -= 400.0 * delta * skills.speed;
        if (this.moveRight) this.velocity.x += 400.0 * delta * skills.speed;

        yawCamera.translateX(this.velocity.x * delta);
        yawCamera.translateY(this.velocity.y * delta * 2.5 * skills.jump);
        yawCamera.translateZ(this.velocity.z * delta);

        this.velocity.y = Math.max(0, this.velocity.y);

        if (yawCamera.position.y < 10) {
            this.velocity.y = 0;
            yawCamera.position.y = 10;
        }

        this.prevTime = time;
    }
}

function create() {

    return new KeyboardControls();
}

export {create}