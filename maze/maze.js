var camera;
var scene;
var renderer;
var mesh;
var sphere;
var center;

var mouseX = 0;

var maze = {width: 15, large: 9, cellSize: 500};

var angleY = 0;
var angleX = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var incrementoX = Math.PI / (windowHalfX);
var incrementoY = Math.PI / (windowHalfY);

var person = {
    startPosition: {
        x: 1,
        z: 8
    }
};

var ray;

window.wallGeometries = [];

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = (person.startPosition.x - maze.width / 2) * maze.cellSize;
    camera.position.z = (person.startPosition.z - maze.large / 2) * maze.cellSize - maze.cellSize / 2;

    center = new THREE.Vector3(camera.position.x + 250, 0, 0);

    var geometryCube = new THREE.CubeGeometry(200, 200, 200);
    var geometrySphere = new THREE.SphereGeometry(75, 16, 16);
    var geometryPlane = new THREE.PlaneGeometry(maze.width * maze.cellSize, maze.large * maze.cellSize);
    var geometryPlaneBasic = new THREE.PlaneGeometry(maze.cellSize, maze.cellSize, 1, 1);

    var floorTexture = THREE.ImageUtils.loadTexture('textures/floor.jpg', {}, function () {
        renderer.render(scene, camera);
        animate();
    });
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(maze.width, maze.large);
    floorTexture.needsUpdate = true;
    var ceilingAndFloorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, doubleSided: true, side: THREE.DoubleSide});

    var wallTexture = THREE.ImageUtils.loadTexture('textures/wall.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.needsUpdate = true;

    mesh = new THREE.Mesh(geometryCube, new THREE.MeshBasicMaterial({
        map: wallTexture,
        color: 0x009900,
        wireframe: false
    }));
    mesh.position.z = -1500;

    sphere = new THREE.Mesh(geometrySphere, new THREE.MeshBasicMaterial({map: new THREE.ImageUtils.loadTexture('textures/fire.jpg')}));
    sphere.position.z = 2000;
    sphere.position.x = 1000;

    var ceiling = new THREE.Mesh(geometryPlane, ceilingAndFloorMaterial);
    ceiling.side = THREE.DoubleSide;
    ceiling.rotation.x = -Math.PI / 2;
    ceiling.position.y = 250;
    ceiling.position.x = 0;
    ceiling.position.z = 0;
    scene.add(ceiling);

    var floor = new THREE.Mesh(geometryPlane, ceilingAndFloorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -250;
    floor.position.x = 0;
    floor.position.z = 0;
    scene.add(floor);

    var wallMaterial = new THREE.MeshBasicMaterial({map: wallTexture, doubleSided: true, side: THREE.DoubleSide});
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
        borderWallEW.position.x = maze.width / 2 * maze.cellSize;
        borderWallEW.rotation.y = Math.PI / 2;
        borderWallEW.position.y = 0;
        borderWallEW.position.z = (actualMazeLarge - maze.large / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(borderWallEW);
        wallGeometries.push(borderWallEW);

        borderWallEW = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        borderWallEW.position.x = -maze.width / 2 * maze.cellSize;
        borderWallEW.rotation.y = Math.PI / 2;
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
        insideWalls.position.x = (wallData.x - maze.width / 2) * maze.cellSize + offsizeX;
        insideWalls.rotation.y = wallData.orientation == 'left' || wallData.orientation == 'right' ? Math.PI / 2 : 0;
        insideWalls.position.y = 0;
        insideWalls.position.z = (wallData.z - maze.large / 2) * maze.cellSize + offsizeZ;
        scene.add(insideWalls);
        wallGeometries.push(insideWalls);
    }

    scene.add(mesh);
    scene.add(sphere);

    //adding some light to the scene
    var pointLight = new THREE.DirectionalLight(0xffffff);
    pointLight.position.set(0, 0, 1).normalize();
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * .75);
    document.body.insertBefore(renderer.domElement, document.getElementById('footer'));
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('keydown', onKeyDown, false);
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
    var keyCode = e.which || e.keyCode;
    if (keyCode == 87) {
        camera.translateZ(-30);
    }
    if (keyCode == 68) {
        //    camera.translateX(30);
    }
    if (keyCode == 83) {
        camera.translateZ(30);
    }
    if (keyCode == 65) {
        //    camera.translateX(-30);
    }
    ray = new THREE.Raycaster(camera.position, center.clone().normalize());
    ray.far = 100;

    if (ray.intersectObjects(wallGeometries).length > 0) {

        if (keyCode == 87) {
            camera.translateZ(30);
        }
        if (keyCode == 68) {
            camera.translateX(-30);
        }
        if (keyCode == 83) {
            camera.translateZ(-30);
        }
        if (keyCode == 65) {
            camera.translateX(30);
        }
    } else {
        angleY += incrementoY;
        center.y = 400 * Math.sin(angleY * 80);
    }
    if (ray.intersectObject(mesh).length > 0) {
        scene.remove(mesh);
        document.getElementById('cube').setAttribute('style', 'text-decoration:line-through;color:#007700');
    }
    if (ray.intersectObject(sphere).length > 0) {
        scene.remove(sphere);
        document.getElementById('ball').setAttribute('style', 'text-decoration:line-through;color:#EE8712');
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

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    sphere.rotation.y -= 0.01;

    //camera.position.x += (mouseX - camera.position.x) * 0.05;
    //camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(center);
    renderer.render(scene, camera);
}
