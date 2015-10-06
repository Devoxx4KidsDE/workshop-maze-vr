import * as THREE from './../libs/three';
import Wall from './../maze/wall';
import UI from './../maze/ui';
import KeyboardControls from './../maze/keyboardControls';
import MouseControls from './../maze/mouseControls';
import DeviceOrientationController from './../maze/deviceOrientationController';
import VREffect from './../libs/VREffect';
import './../libs/webvr-manager';
import './../libs/webvr-polyfill';

const animate = Symbol();
const mouseMove = Symbol();

class MazeTemplate {
    constructor() {
        this.length = undefined;
        this.width = undefined;
        this.cellSize = undefined;
        this.scene = undefined;

        this.player = {
            geometry: undefined,
            configuration: undefined,
            camera: undefined,
            keyboardControls: undefined,
            controls: undefined
        };

        this.walls = [];
        this.floor = [];
        this.items = [];
        this.ceiling = [];

        this.renderer = undefined;

        this[animate] = (timestamp) => {
            requestAnimationFrame(this[animate]);
            this.player.controls.update();
            this.manager.render(this.scene, this.player.camera, timestamp);
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

    addWalls(walls) {
        walls.forEach(w => {
            this.scene.add(w);
            this.walls.push(w);
        });
    }

    addPlayer(playerConfiguration) {

        this.player.configuration = playerConfiguration;

        let playerGeometry = new THREE.Mesh(
            new THREE.BoxGeometry(playerConfiguration.body.width, playerConfiguration.body.height, playerConfiguration.body.depth),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('textures/player.png'),
                side: THREE.FrontSide
            })
        );
        playerGeometry.position.x = (playerConfiguration.position.x * this.cellSize) + (this.cellSize / 2);
        playerGeometry.position.z = (playerConfiguration.position.z * this.cellSize) + (this.cellSize / 2);
        this.player.geometry = playerGeometry;
        this.scene.add(playerGeometry);

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
        camera.position.x = playerGeometry.position.x;
        camera.position.z = playerGeometry.position.z;
        camera.position.y = playerGeometry.position.y;
        this.player.camera = camera;
    }

    start() {
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('maze').appendChild(renderer.domElement);

        this.renderer = renderer;

        // Apply VR stereo rendering to renderer.
        this.effect = new VREffect(renderer);
        this.effect.setSize(window.innerWidth, window.innerHeight);

        // Create a VR manager helper to enter and exit VR mode.
        this.manager = new WebVRManager(renderer, this.effect, {hideButton: false});

        this.player.controls = new DeviceOrientationController( this.player.camera, this.player.configuration.skills, this.renderer.domElement );
        this.player.controls.connect();

        UI.draw({
            id: 'player-name',
            text: this.player.configuration.name
        });

        this[animate]();
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.player.camera.aspect = window.innerWidth / window.innerHeight;
        this.player.camera.updateProjectionMatrix();

        this.effect.setSize( window.innerWidth, window.innerHeight );
    };

}

function create({length, width, cellSize}) {
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
            orientation: 'left',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallBack]);

        let borderWallFront = Wall.create({
            z: width - 1,
            x: actualMazeLength,
            orientation: 'right',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallFront]);
    }

    // North and South walls
    for (let actualMazeWidth = 0; actualMazeWidth < width; actualMazeWidth++) {
        let borderWallRight = Wall.create({
            z: actualMazeWidth,
            x: length - 1,
            orientation: 'front',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallRight]);

        let borderWallLeft = Wall.create({
            z: actualMazeWidth,
            x: 0,
            orientation: 'back',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallLeft]);
    }

    return maze;
}

export default {create}
