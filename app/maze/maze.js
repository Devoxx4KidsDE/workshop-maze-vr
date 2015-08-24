import * as THREE from './../libs/three.js';

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

    var basePlane = new THREE.PlaneBufferGeometry(options.width * options.cellSize, options.large * options.cellSize);

    // ceiling
    var ceiling = new THREE.Mesh(basePlane, new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/ceiling.jpg')
    }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = options.cellSize / 2;
    scene.add(ceiling);

    // floor
    var floorTexture = THREE.ImageUtils.loadTexture('textures/floor.png');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(options.width, options.large);

    var floor = new THREE.Mesh(basePlane, new THREE.MeshBasicMaterial({
        map: floorTexture
    }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -options.cellSize / 2;
    scene.add(floor);

    var geometryPlaneBasic = new THREE.PlaneBufferGeometry(options.cellSize, options.cellSize, 1, 1);

    var wallMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('textures/wall.png'),
        side: THREE.DoubleSide
    });
    // South and North walls
    for (var actualMazeWidth = 0; actualMazeWidth < options.width; actualMazeWidth++) {
        var borderWallSN = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallSN.position.z = options.large / 2 * options.cellSize;
        borderWallSN.position.y = 0;
        borderWallSN.position.x = (actualMazeWidth - options.width / 2) * options.cellSize + options.cellSize / 2;
        scene.add(borderWallSN);
        wallGeometries.push(borderWallSN);

        borderWallSN = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallSN.position.z = -options.large / 2 * options.cellSize;
        borderWallSN.position.y = 0;
        borderWallSN.position.x = (actualMazeWidth - options.width / 2) * options.cellSize + options.cellSize / 2;
        scene.add(borderWallSN);
        wallGeometries.push(borderWallSN);
    }

    // East and West walls
    for (var actualMazeLarge = 0; actualMazeLarge < options.large; actualMazeLarge++) {
        var borderWallEW = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallEW.rotation.y = Math.PI / 2;
        borderWallEW.position.x = options.width / 2 * options.cellSize;
        borderWallEW.position.y = 0;
        borderWallEW.position.z = (actualMazeLarge - options.large / 2) * options.cellSize + options.cellSize / 2;
        scene.add(borderWallEW);
        wallGeometries.push(borderWallEW);

        borderWallEW = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallEW.rotation.y = Math.PI / 2;
        borderWallEW.position.x = -options.width / 2 * options.cellSize;
        borderWallEW.position.y = 0;
        borderWallEW.position.z = (actualMazeLarge - options.large / 2) * options.cellSize + options.cellSize / 2;
        scene.add(borderWallEW);
        wallGeometries.push(borderWallEW);
    }
}

function addWalls(walls, options) {
    // walls inside the maze
    walls.forEach(wall => {
        var offsizeX = 0;
        var offsizeZ = 0;

        if (wall.orientation === 'front') {
            offsizeX = -250;
            offsizeZ = -options.cellSize;
        } else if (wall.orientation === 'back') {
            offsizeX = -250;
            offsizeZ = 0;
        } else if (wall.orientation === 'left') {
            offsizeX = -options.cellSize;
            offsizeZ = -250;
        } else if (wall.orientation === 'right') {
            offsizeX = 0;
            offsizeZ = -250;
        }

        var insideWalls = new THREE.Mesh(new THREE.PlaneBufferGeometry(options.cellSize, options.cellSize, 1, 1), wall.material);
        insideWalls.rotation.y = wall.orientation === 'left' || wall.orientation === 'right' ? Math.PI / 2 : 0;
        insideWalls.position.x = (wall.x - options.width / 2) * options.cellSize + offsizeX;
        insideWalls.position.y = 0;
        insideWalls.position.z = (wall.z - options.large / 2) * options.cellSize + offsizeZ;

        scene.add(insideWalls);
        wallGeometries.push(insideWalls);
    });
}

function addItem(item, position, id) {

    item.position.x = position.x;
    item.position.y = position.y;
    item.position.z = position.z;
    scene.add(item);

    document.addEventListener('keydown', function () {
        var ray = new THREE.Raycaster(camera.position, new THREE.Vector3(camera.position.x + 250, 0, 0).normalize(), 0, 100);
        if (ray.intersectObject(item).length > 0) {
            scene.remove(item);
            document.getElementById(id).classList.add('found');
        }
    }, false);
}

function init(options, player) {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = (player.x - options.width / 2) * options.cellSize;
    camera.position.z = (player.z - options.large / 2) * options.cellSize - options.cellSize / 2;

    center = new THREE.Vector3(camera.position.x + 250, 0, 0);

    //adding some light to the scene
    var pointLight = new THREE.DirectionalLight(0xffffff);
    pointLight.position.set(0, 0, 1).normalize();
    scene.add(pointLight);

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

export {create, init, addWalls, addItem}