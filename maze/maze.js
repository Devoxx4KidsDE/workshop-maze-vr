var camera;
var scene;
var renderer;
var collectibleItemCube;
var collectibleItemSphere;
var center;

var maze = {width: 15, large: 9, cellSize: 500};

var angleX = 0;
var windowHalfX = window.innerWidth / 2;
var incrementoX = Math.PI / (windowHalfX);

var mouseX = windowHalfX;

var person = {
    startPosition: {
        x: 1,
        z: 8
    }
};

wallGeometries = [];

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = (person.startPosition.x - maze.width / 2) * maze.cellSize;
    camera.position.z = (person.startPosition.z - maze.large / 2) * maze.cellSize - maze.cellSize / 2;

    center = new THREE.Vector3(camera.position.x + 250, 0, 0);

    var geometryPlane = new THREE.PlaneBufferGeometry(maze.width * maze.cellSize, maze.large * maze.cellSize);
    var geometryPlaneBasic = new THREE.PlaneBufferGeometry(maze.cellSize, maze.cellSize, 1, 1);

    // ceiling
    var ceiling = new THREE.Mesh(geometryPlane, new THREE.MeshBasicMaterial({
        color: 'blue',
        doubleSided: true,
        side: THREE.DoubleSide
    }));
    ceiling.side = THREE.DoubleSide;
    ceiling.rotation.x = -Math.PI / 2;
    ceiling.position.y = 250;
    ceiling.position.x = 0;
    ceiling.position.z = 0;
    scene.add(ceiling);

    // floor
    var floor = new THREE.Mesh(geometryPlane, new THREE.MeshBasicMaterial({
        color: 'black',
        doubleSided: true,
        side: THREE.DoubleSide
    }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -250;
    floor.position.x = 0;
    floor.position.z = 0;
    scene.add(floor);

    var wallMaterial = new THREE.MeshBasicMaterial({color: 'grey', doubleSided: true, side: THREE.DoubleSide});
    // South and North walls
    for (var actualMazeWidth = 0; actualMazeWidth < maze.width; actualMazeWidth++) {
        var borderWallSN = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallSN.position.z = maze.large / 2 * maze.cellSize;
        borderWallSN.position.y = 0;
        borderWallSN.position.x = (actualMazeWidth - maze.width / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(borderWallSN);
        wallGeometries.push(borderWallSN);

        borderWallSN = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallSN.position.z = -maze.large / 2 * maze.cellSize;
        borderWallSN.position.y = 0;
        borderWallSN.position.x = (actualMazeWidth - maze.width / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(borderWallSN);
        wallGeometries.push(borderWallSN);
    }

    // East and West walls
    for (var actualMazeLarge = 0; actualMazeLarge < maze.large; actualMazeLarge++) {
        var borderWallEW = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallEW.rotation.y = Math.PI / 2;
        borderWallEW.position.x = maze.width / 2 * maze.cellSize;
        borderWallEW.position.y = 0;
        borderWallEW.position.z = (actualMazeLarge - maze.large / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(borderWallEW);
        wallGeometries.push(borderWallEW);

        borderWallEW = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallEW.rotation.y = Math.PI / 2;
        borderWallEW.position.x = -maze.width / 2 * maze.cellSize;
        borderWallEW.position.y = 0;
        borderWallEW.position.z = (actualMazeLarge - maze.large / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(borderWallEW);
        wallGeometries.push(borderWallEW);
    }

    // walls inside the maze
    var offsizeX = 0;
    var offsizeZ = 0;
    for (var i = 0; i < walls.length; i++) {
        var wallData = walls[i];
        var insideWalls = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        if (wallData.orientation == 'front') {
            offsizeX = -250;
            offsizeZ = -maze.cellSize;
        } else if (wallData.orientation == 'back') {
            offsizeX = -250;
            offsizeZ = 0;
        } else if (wallData.orientation == 'left') {
            offsizeX = -maze.cellSize;
            offsizeZ = -250;
        } else if (wallData.orientation == 'right') {
            offsizeX = 0;
            offsizeZ = -250;
        }
        insideWalls.rotation.y = wallData.orientation == 'left' || wallData.orientation == 'right' ? Math.PI / 2 : 0;
        insideWalls.position.x = (wallData.x - maze.width / 2) * maze.cellSize + offsizeX;
        insideWalls.position.y = 0;
        insideWalls.position.z = (wallData.z - maze.large / 2) * maze.cellSize + offsizeZ;
        scene.add(insideWalls);
        wallGeometries.push(insideWalls);
    }

    // cube
    collectibleItemCube = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
        color: 'green'
    }));
    collectibleItemCube.position.z = -1500;
    scene.add(collectibleItemCube);

    // sphere
    collectibleItemSphere = new THREE.Mesh(new THREE.SphereGeometry(75, 16, 16), new THREE.MeshBasicMaterial({
        color: 'yellow'
    }));
    collectibleItemSphere.position.z = 2000;
    collectibleItemSphere.position.x = 1000;
    scene.add(collectibleItemSphere);

    //adding some light to the scene
    var pointLight = new THREE.DirectionalLight(0xffffff);
    pointLight.position.set(0, 0, 1).normalize();
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * .75);
    document.body.insertBefore(renderer.domElement, document.getElementById('footer'));
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
    if (ray.intersectObjects(wallGeometries).length !== 1) {
        var keyCode = e.which || e.keyCode;
        // w
        if (keyCode == 87) {
            camera.translateZ(-30);
        }
        // d
        if (keyCode == 68) {
            camera.translateX(30);
        }
        //s
        if (keyCode == 83) {
            camera.translateZ(30);
        }
        // a
        if (keyCode == 65) {
            camera.translateX(-30);
        }
    }

    if (ray.intersectObject(collectibleItemCube).length === 1) {
        scene.remove(collectibleItemCube);
        document.getElementById('cube').classList.add('found');
    }
    if (ray.intersectObject(collectibleItemSphere).length === 1) {
        scene.remove(collectibleItemSphere);
        document.getElementById('ball').classList.add('found');
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

    collectibleItemCube.rotation.x += 0.01;
    collectibleItemCube.rotation.y += 0.02;
    collectibleItemSphere.rotation.y -= 0.01;

    camera.lookAt(center);
    renderer.render(scene, camera);
}
