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

var posInitial = {x: 1, z: 8};
var ray;

window.wallGeometries = [];

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = (posInitial.x - maze.width / 2) * maze.cellSize;
    camera.position.z = (posInitial.z - maze.large / 2) * maze.cellSize - maze.cellSize / 2;

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
    var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, doubleSided: true, side: THREE.DoubleSide});

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

    var floorPlane = new THREE.Mesh(geometryPlane, floorMaterial);
    floorPlane.side = THREE.DoubleSide;

    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = 250;
    floorPlane.position.x = 0;
    floorPlane.position.z = 0;

    var plane2 = new THREE.Mesh(geometryPlane, floorMaterial);
    plane2.rotation.x = -Math.PI / 2;
    plane2.position.y = -250;
    floorPlane.position.x = 0;
    floorPlane.position.z = 0;

    var wall;
    var wallMaterial = new THREE.MeshBasicMaterial({map: wallTexture, doubleSided: true, side: THREE.DoubleSide});

    for (var actualMazeWidth = 0; actualMazeWidth < maze.width; actualMazeWidth++) {
        wall = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        wall.position.z = maze.large / 2 * maze.cellSize;
        wall.position.y = 0;
        wall.position.x = (actualMazeWidth - maze.width / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(wall);
        wallGeometries.push(wall);

        wall = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        wall.position.z = -maze.large / 2 * maze.cellSize;
        wall.position.y = 0;
        wall.position.x = (actualMazeWidth - maze.width / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(wall);
        wallGeometries.push(wall);
    }

    for (var actualMazeLarge = 0; actualMazeLarge < maze.large; actualMazeLarge++) {
        wall = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        wall.position.x = maze.width / 2 * maze.cellSize;
        wall.rotation.y = Math.PI / 2;
        wall.position.y = 0;
        wall.position.z = (actualMazeLarge - maze.large / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(wall);
        wallGeometries.push(wall);

        wall = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
        wall.position.x = -maze.width / 2 * maze.cellSize;
        wall.rotation.y = Math.PI / 2;
        wall.position.y = 0;
        wall.position.z = (actualMazeLarge - maze.large / 2) * maze.cellSize + maze.cellSize / 2;
        scene.add(wall);
        wallGeometries.push(wall);
    }

    var offsizeX = 0;
    var offsizeZ = 0;

    for (var i = 0; i < walls.length; i++) {
        var wallData = walls[i];
        wall = new THREE.Mesh(geometryPlaneBasic, wallMaterial);
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
        wall.position.x = (wallData.x - maze.width / 2) * maze.cellSize + offsizeX;
        wall.rotation.y = wallData.orientation == 'left' || wallData.orientation == 'right' ? Math.PI / 2 : 0;
        wall.position.y = 0;
        wall.position.z = (wallData.z - maze.large / 2) * maze.cellSize + offsizeZ;
        scene.add(wall);
        wallGeometries.push(wall);
    }
    //wall.rotation.x = -Math.PI/2;

    scene.add(mesh);
    scene.add(sphere);
    scene.add(floorPlane);
    scene.add(plane2);

    //addiding some light to the scene
    var pointLight = new THREE.DirectionalLight(0xffffff);
    pointLight.position.set(0, 0, 1).normalize();

    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * .75);
    document.body.insertBefore(renderer.domElement, document.getElementById('footer'));
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
}

function onDocumentMouseMove(e) {
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

function onDocumentKeyDown(e) {
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
