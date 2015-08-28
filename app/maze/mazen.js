import * as THREE from './../libs/three.js';
import * as wall from './../maze/wall.js';

const animate = Symbol();
const keyDown = Symbol();

class MazeTemplate {
    constructor() {
        this.length = undefined;
        this.width = undefined;
        this.cellSize = undefined;
        this.scene = undefined;
        this.player = {
            player: undefined,
            camera: undefined,
            center: undefined
        };
        this.walls = [];
        this.floor = [];
        this.items = [];
        this.ceiling = [];
        this.renderer = undefined;

        this[animate] = () => {
            requestAnimationFrame(this[animate]);

            this.renderer.render(this.scene, this.player.camera);
        };

        this[keyDown] = (event) => {
            var keyCode = event.which || event.keyCode;
            // w
            if (keyCode === 87) {
                this.player.camera.translateZ(-30);
            }
            // d
            if (keyCode === 68) {
                this.player.camera.translateX(30);
            }
            //s
            if (keyCode === 83) {
                this.player.camera.translateZ(30);
            }
            // a
            if (keyCode === 65) {
                this.player.camera.translateX(-30);
            }
            // j
            if (keyCode === 74) {
                this.player.camera.translateY(-60);
            }
            // u
            if (keyCode === 85) {
                this.player.camera.translateY(60);
            }
        }
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

    addPlayer(player) {
        this.player.player = player;

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = (player.position.x * this.cellSize) + (this.cellSize / 2);
        camera.position.z = (player.position.z * this.cellSize) + (this.cellSize / 2);
        this.player.camera = camera;

        this.player.center = new THREE.Vector3(camera.position.x, 0, camera.position.z + (this.cellSize / 2));
    }

    start() {
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight * .75);
        document.getElementById('maze').appendChild(renderer.domElement);

        this.renderer = renderer;

        document.addEventListener('keydown', this[keyDown], false);

        this[animate]();
    }
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
        let borderWallWest = wall.create({
            z: 0,
            x: actualMazeLength,
            orientation: 'left',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallWest]);

        let borderWallEast = wall.create({
            z: width - 1,
            x: actualMazeLength,
            orientation: 'right',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallEast]);
    }

    // North and South walls
    for (let actualMazeWidth = 0; actualMazeWidth < width; actualMazeWidth++) {
        let borderWallNorth = wall.create({
            z: actualMazeWidth,
            x: length - 1,
            orientation: 'front',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallNorth]);

        let borderWallSouth = wall.create({
            z: actualMazeWidth,
            x: 0,
            orientation: 'back',
            texture: 'wall'
        }, cellSize);
        maze.addWalls([borderWallSouth]);
    }

    return maze;
}

export {create}