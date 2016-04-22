import * as THREE from './../libs/three';
import Wall from './wall';
import UI from './ui';
import CollisionDetector from './collisionDetector';
import DeviceOrientationController from './deviceOrientationController';
import VREffect from './../libs/VREffect';
import './../libs/webvr-manager';
import './../libs/webvr-polyfill';

const animate = Symbol();
const mouseMove = Symbol();

/* gobal definition of camera and effect for onWindowResize() see #2 */
var camera;
var effect;
var renderer;

class MazeTemplate {
    constructor() {
        this.length = undefined;
        this.width = undefined;
        this.cellSize = undefined;
        this.scene = undefined;

        this.player = {
            collisionDetector: undefined,
            configuration: undefined,
            controls: undefined
        };

        this.walls = [];
        this.floor = [];
        this.items = [];
        this.ceiling = [];

        this[animate] = (timestamp) => {
            requestAnimationFrame(this[animate]);
            this.player.controls.update();

            const center = x => (x * this.cellSize) + (this.cellSize / 2);

            var collisionWall = this.player.collisionDetector.hasCollision(camera, this.walls);
            if (collisionWall) {
                // portale
                const {x, z} = collisionWall.triggerCollision();
                if (x !== undefined && z !== undefined) {
                    camera.position.set(center(x), 0, center(z));
                }
            } else {
                //walk on
                camera.translateZ(-this.player.configuration.speed);
            }

            this.items.forEach(item => {
                if (!item.isCollected) {
                    if (this.player.collisionDetector.hasCollision(camera, [item.geometry])) {
                        console.log(item.name + ' collected!');
                        item.isCollected = true;
                        UI.update(item.name, 'found');

                        for (let i = this.scene.children.length - 1; i >= 0; i--) {
                            let obj = this.scene.children[i];
                            if (obj === item.geometry) {
                                this.scene.remove(obj);
                            }
                        }

                    }
                }
            });

            camera.position.setY(0); //no movement up and down
            this.manager.render(this.scene, camera, timestamp);
        };
    }

    addCeilings(ceilings) {
        ceilings.forEach(ceiling => {
            this.scene.add(ceiling);
            this.ceiling.push(ceiling);
        });
    }

    addFloors(floors) {
        floors.forEach(f => {
            this.scene.add(f);
            this.floor.push(f);
        });
    }

    addWall(wall) {

        const wallMesh = wall.getMesh();

        this.scene.add(wallMesh);
        this.walls.push(wall);
    }

    addWalls(walls) {
        walls.forEach(w => this.addWall(w));
    }

    addPlayer(playerConfiguration) {

        this.player.configuration = playerConfiguration;
        this.player.collisionDetector = CollisionDetector.create();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
        camera.position.x = (this.player.configuration.position.x * this.cellSize) + (this.cellSize / 2);
        camera.position.z = (this.player.configuration.position.z * this.cellSize) + (this.cellSize / 2);
        // looking into the maze
        let lookAtPoint = new THREE.Vector3(this.cellSize, 0, this.cellSize / 2);
        camera.lookAt(lookAtPoint);
    }

    addItem(item) {

        item.geometry.position.x = (item.geometry.position.x * this.cellSize) + (this.cellSize / 2);
        item.geometry.position.y = (item.geometry.position.y * this.cellSize);
        item.geometry.position.z = (item.geometry.position.z * this.cellSize) + (this.cellSize / 2);
        this.items.push(item);
        this.scene.add(item.geometry);
    }

    start() {

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('maze').appendChild(renderer.domElement);

        // Apply VR stereo rendering to renderer.
        effect = new VREffect(renderer);
        effect.setSize(window.innerWidth, window.innerHeight);

        // Create a VR manager helper to enter and exit VR mode.
        this.manager = new WebVRManager(renderer, effect, {hideButton: false});

        this.player.controls = new DeviceOrientationController(camera, this.player.configuration.skills, renderer.domElement);
        this.player.controls.connect();

        UI.draw({
            id: 'player-name',
            text: this.player.configuration.name
        });
        UI.pageTitle();
        UI.refreshButton();

        this[animate]();
        window.addEventListener('resize', MazeTemplate.onWindowResize);

        this.items.forEach(item => {
            UI.add({
                id: item.name,
                text: item.name
            }, 'items');
        });
    }

    static onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        effect.setSize(window.innerWidth, window.innerHeight);
    }

}

function create({length = 10, width = 10, cellSize = 500}) {
    let maze = new MazeTemplate();

    maze.length = length;
    maze.width = width;
    maze.cellSize = cellSize;

    maze.scene = new THREE.Scene();

    // ceiling
    let ceiling = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2 * length * cellSize, 2 * width * cellSize),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('textures/ceiling.jpg')
        })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = cellSize;
    ceiling.position.x = (length * cellSize) / 2;
    ceiling.position.z = (width * cellSize) / 2;
    maze.addCeilings([ceiling]);

    // floor
    let floorTexture = THREE.ImageUtils.loadTexture('textures/floor.png');
    floorTexture.anisotropy = 1;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(length, width);

    let floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(length * cellSize, width * cellSize),
        new THREE.MeshBasicMaterial({
            map: floorTexture
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -cellSize / 2;
    floor.position.x = (length * cellSize) / 2;
    floor.position.z = (width * cellSize) / 2;
    maze.addFloors([floor]);

    // East and Wests walls
    for (let actualMazeLength = 0; actualMazeLength < length; actualMazeLength++) {
        let borderWallBack = Wall.create({
            z: 0,
            x: actualMazeLength,
            orientation: 'left'
        }, cellSize);
        maze.addWalls([borderWallBack]);

        let borderWallFront = Wall.create({
            z: width - 1,
            x: actualMazeLength,
            orientation: 'right'
        }, cellSize);
        maze.addWalls([borderWallFront]);
    }

    // North and South walls
    for (let actualMazeWidth = 0; actualMazeWidth < width; actualMazeWidth++) {
        let borderWallRight = Wall.create({
            z: actualMazeWidth,
            x: length - 1,
            orientation: 'front'
        }, cellSize);
        maze.addWalls([borderWallRight]);

        let borderWallLeft = Wall.create({
            z: actualMazeWidth,
            x: 0,
            orientation: 'back'
        }, cellSize);
        maze.addWalls([borderWallLeft]);
    }

    return maze;
}

export default {create};
