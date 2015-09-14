import * as THREE from './../libs/three';
import * as wall from './../maze/wall';

var camera;
var renderer;
var collectibleItemCube;
var collectibleItemSphere;
var center;
var scene;

var angleX = 0;
var windowHalfX = window.innerWidth / 2;
var incrementoX = Math.PI / windowHalfX;

var mouseX = windowHalfX;

var wallGeometries = [];

function create(options) {
    scene = new THREE.Scene();

    // ceiling
    var ceiling = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2 * options.length * options.cellSize, 2 * options.width * options.cellSize),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('textures/ceiling.jpg')
        })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = options.cellSize;
    ceiling.position.x = (options.length * options.cellSize) / 2;
    ceiling.position.z = (options.width * options.cellSize) / 2;
    scene.add(ceiling);

    // floor
    var floorTexture = THREE.ImageUtils.loadTexture('textures/floor.png');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(options.length, options.width);

    var floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(options.length * options.cellSize, options.width * options.cellSize),
        new THREE.MeshBasicMaterial({
            map: floorTexture
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -options.cellSize / 2;
    floor.position.x = (options.length * options.cellSize) / 2;
    floor.position.z = (options.width * options.cellSize) / 2;
    scene.add(floor);

    // East and Wests walls
    for (var actualMazeLength = 0; actualMazeLength < options.length; actualMazeLength++) {
        var borderWallWest = wall.create({
            z: 0,
            x: actualMazeLength,
            orientation: 'left',
            texture: 'wall'
        }, options.cellSize);
        scene.add(borderWallWest);
        wallGeometries.push(borderWallWest);

        var borderWallEast = wall.create({
            z: options.width - 1,
            x: actualMazeLength,
            orientation: 'right',
            texture: 'wall'
        }, options.cellSize);
        scene.add(borderWallEast);
        wallGeometries.push(borderWallEast);
    }

    // North and South walls
    for (var actualMazeWidth = 0; actualMazeWidth < options.width; actualMazeWidth++) {
        var borderWallNorth = wall.create({
            z: actualMazeWidth,
            x: options.length - 1,
            orientation: 'front',
            texture: 'wall'
        }, options.cellSize);
        scene.add(borderWallNorth);
        wallGeometries.push(borderWallNorth);

        var borderWallSouth = wall.create({
            z: actualMazeWidth,
            x: 0,
            orientation: 'back',
            texture: 'wall'
        }, options.cellSize);
        scene.add(borderWallSouth);
        wallGeometries.push(borderWallSouth);
    }
}

function addWalls(walls) {
    walls.forEach(wall => {
        scene.add(wall);
        wallGeometries.push(wall);
    });
}

function addItem(item, position, id, options) {

    item.position.x = (position.x * options.cellSize) + options.cellSize / 2;
    item.position.z = (position.z * options.cellSize) + options.cellSize / 2;
    scene.add(item);

    document.addEventListener('keydown', function () {
        var ray = new THREE.Raycaster(camera.position, new THREE.Vector3(camera.position.x + 250, 0, 0).normalize(), 0, 100);
        if (ray.intersectObject(item).length > 0) {
            scene.remove(item);
            document.getElementById(id).classList.add('found');
        }
    }, false);
}

function setPlayer(options, player) {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = (player.x * options.cellSize) + (options.cellSize / 2);
    camera.position.z = (player.z * options.cellSize) + (options.cellSize / 2);

    center = new THREE.Vector3(camera.position.x + 250, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * .75);
    document.body.insertBefore(renderer.domElement, document.getElementById('footer'));

    // listeners
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('keydown', onKeyDown, false);

    animate();
}

function onMouseMove(e) {
    var difference = mouseX - e.clientX;
    angleX -= incrementoX * difference;

    mouseX = e.clientX;
    if (mouseX <= windowHalfX - 100 && difference > 0) {
        angleX -= incrementoX * 5;
    }
    if (mouseX >= windowHalfX + 100 && difference < 0) {
        angleX += incrementoX * 5;
    }
    //x movement ok
    e.preventDefault();
}

function onKeyDown(e) {
    var ray = new THREE.Raycaster(camera.position, center.clone().normalize(), 0, 100);

    // This makes it impossible to walk through walls
    if (ray.intersectObjects(wallGeometries).length === 0) {
        var keyCode = e.which || e.keyCode;
        // w
        if (keyCode === 87) {
            camera.translateZ(-30);
        }
        // d
        if (keyCode === 68) {
            camera.translateX(30);
        }
        //s
        if (keyCode === 83) {
            camera.translateZ(30);
        }
        // a
        if (keyCode === 65) {
            camera.translateX(-30);
        }
        // j
        if (keyCode === 74) {
            camera.translateY(-60);
        }
        // j
        if (keyCode === 85) {
            camera.translateY(60);
        }
    }
}

function animate() {
    if (mouseX <= 100) {
        angleX -= incrementoX * 10;
    }
    if (mouseX >= windowHalfX * 2 - 100) {
        angleX += incrementoX * 10;
    }

    center.x = windowHalfX * 32 * Math.cos(angleX);
    center.z = windowHalfX * 32 * Math.sin(angleX);

    requestAnimationFrame(animate);

    camera.lookAt(center);
    renderer.render(scene, camera);
}

export {create, setPlayer, addWalls, addItem}