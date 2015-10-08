import * as THREE from './../libs/three.js';

/*
* Based on http://webmaestro.fr/collisions-detection-three-js-raycasting/
* Uses camera lookat direction as ray for ray caster which checks collision with all obstacles
* Note: can only be used because of fixed movment in camera direction (0,0,-1)!
*/
class CollisionDetector {

    constructor(minimalDistance = 32) {
        this.minimalDistance = minimalDistance;
        this.raycaster = undefined;
    }

    hasCollision ( camera, obstacles ) {
        var collisions;
        // Maximum distance from the origin before we consider collision
        // We reset the raycaster to camera position and lookAt direction
        var lookAtVector = new THREE.Vector3(0, 0, -1);
        lookAtVector.applyQuaternion(camera.quaternion);
        this.raycaster.set(camera.position, lookAtVector);
        // Test if we intersect with any obstacle mesh
        collisions = this.raycaster.intersectObjects(obstacles);
        if (collisions.length > 0 && collisions[0].distance <= this.minimalDistance) {
            return true;
        }
        return false;
    }
}

function create() {

    let detector = new CollisionDetector();
    detector.raycaster = new THREE.Raycaster();

    return detector;
}

export default {create}