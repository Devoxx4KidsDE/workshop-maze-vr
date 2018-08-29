
import THREE from 'three';
import Wall from './wall';
import UI from './ui';
import CollisionDetector from './collisionDetector';
import DeviceOrientationController from './deviceOrientationController';
import 'three/examples/js/effects/VREffect';
import WebVRManager from 'webvr-boilerplate'; /* global WebVRManager: true */
import 'webvr-polyfill';

const animate = Symbol();

/* gobal definition of camera and effect for onWindowResize() see #2 */
var camera;
var effect;
var renderer;

class MazeTemplate {
    constructor() {
        this.length = undefined;
        this.width = undefined;
        this.cellSize = undefined;
        this.buttonCallback = undefined;

        this.flyheight = 0;

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
        this.otherPlayers = [];
        this.lastSensorX = 0;


        /*
            Magnetometer support in Chrome

            see
            - https://developers.google.com/web/updates/2017/09/sensors-for-the-web
            - https://www.w3.org/TR/generic-sensor/
            - https://w3c.github.io/magnetometer/

            - You need to have at least Chrome version 63
            - You need to enable
            -- chrome://flags/#enable-generic-sensor
            -- chrome://flags/#enable-generic-sensor-extra-classes
            -- Code must be delivered via HTTPs !

         */

        try {
            this.sensor = new Magnetometer();
            if (this.sensor!==undefined) {
                this.sensor.start();
            }
        } catch(err) {
            console.log("Magnetometer not supported. Make sure you configure chrome://flags/#enable-generic-sensor-extra-classes and deliver Maze via HTTPS.");
            writeText(1,100,"Magnetometer not supported. Try setting the chrome://flags");
        }

        // Check major differences on Magnetometer and identify this as a button-click
        if (this.sensor !== undefined) {
            this.sensor.onreading = () => {
                var delta= this.sensor.x-this.lastSensorX;
                //writeText(300,250,delta.toFixed(2)+"...................");
                if (delta > 100 ) {
                    try {
                        if (this.buttonCallback!==undefined)
                            this.buttonCallback();
                    }
                    catch(err) {
                        writeText(1,100,err.message);
                        console.log(err.message);
                    }

                }

                //writeText(300,300,this.sensor.x.toFixed(2)+"/"+this.sensor.y.toFixed(2)+"/"+this.sensor.z.toFixed(2));
                this.lastSensorX = this.sensor.x.toFixed(2);
            };

            this.sensor.onerror = event => console.log(event.error.name + " (Magnetometer): ", event.error.message);

        }


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

            camera.position.setY(this.flyheight); //no movement up and down


            // Update the players position
            this.player.configuration.setPositionByCamera(camera.position, this.cellSize);

            this.items.forEach(item => {
                if (!item.isCollected) {
                    if (this.player.collisionDetector.hasCollision(camera, [item.geometry])) {
                        item.isCollected = true;
                        this.items.onCollectListener ();
                        UI.update(item.name, 'found');

                        for (let i = this.scene.children.length - 1; i >= 0; i--) {
                            const obj = this.scene.children[i];
                            if (obj === item.geometry) {
                                this.scene.remove(obj);
                            }
                        }

                    }
                }
            });

            this.otherPlayers.map(player => {
              player.mesh.position.x = (player.position.x * this.cellSize) + (this.cellSize / 2);
              player.mesh.position.y = (player.position.y * this.cellSize);
              player.mesh.position.z = (player.position.z * this.cellSize) + (this.cellSize / 2);
            });

            this.manager.render(this.scene, camera, timestamp);
        };
    }

    setButtonCallback(buttonCallback) {
        this.buttonCallback = buttonCallback;
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

    addOtherPlayer(player) {
        this.otherPlayers.push(player);
        this.scene.add(player.mesh);
    }

    removeOtherPlayer(player) {
        this.otherPlayers.splice(this.otherPlayers.indexOf(player), 1);
        this.scene.remove(player.mesh);
    }

    addWalls(walls) {
        walls.forEach(w => this.addWall(w));
    }

    addPlayer(playerConfiguration) {
        this.player.configuration = playerConfiguration;
        this.player.collisionDetector = CollisionDetector.create();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 5000);

        this.setCameraToPlayerPosition();
        // looking into the maze
        const lookAtPoint = new THREE.Vector3(this.cellSize*2, 0, this.cellSize*1.5);
        camera.lookAt(lookAtPoint);
    }

    addItem(item) {
        item.geometry.position.x = (item.geometry.position.x * this.cellSize) + (this.cellSize / 2);
        item.geometry.position.y = (item.geometry.position.y * this.cellSize);
        item.geometry.position.z = (item.geometry.position.z * this.cellSize) + (this.cellSize / 2);
        this.items.push(item);
        this.scene.add(item.geometry);
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.scene.remove(item.geometry);
    }

    removeCollectedItem(name) {
        if (UI.hasClassName(name, 'found') === false) {
            UI.update(name, 'found');
        }
    }

    setCameraToPlayerPosition() {
      const cameraPosition = this.player.configuration.getCameraPosition(this.cellSize);
      camera.position.setX(cameraPosition.x);
      camera.position.setY(0);
      camera.position.setZ(cameraPosition.z);
    }

    start(flyheight = 0) {
        this.flyheight = flyheight;



        // only set the rendering depth very deep (=15000) if we fly over the maze,
        // otherwise the walk through the maze will be unnecessarily deep calculated.

        if (this.flyheight != 0) {

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 15000);

            // look north east over the map
            let lookAtPoint = new THREE.Vector3(this.cellSize*2, 0, this.cellSize*2);
            camera.lookAt(lookAtPoint);
        }

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('maze').appendChild(renderer.domElement);

        // Apply VR stereo rendering to renderer.
        effect = new THREE.VREffect(renderer);
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



function writeText(pixelsFromLeft,punkteVonOben, text) {
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.fontSize = '3em';
    text2.style.backgroundColor = "red";
    text2.innerHTML = text;
    text2.style.top = punkteVonOben + 'px';
    text2.style.left = pixelsFromLeft + 'px';
    document.body.appendChild(text2);
}


function create({length = 10, width = 10, cellSize = 500}) {
    const maze = new MazeTemplate();

    maze.length = length;
    maze.width = width;
    maze.cellSize = cellSize;

    maze.scene = new THREE.Scene();

    // ceiling
    const ceiling = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2 * length * cellSize, 2 * width * cellSize),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader ().load ('textures/ceiling.jpg')
        })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = cellSize;
    ceiling.position.x = (length * cellSize) / 2;
    ceiling.position.z = (width * cellSize) / 2;
    maze.addCeilings([ceiling]);

    // floor
    const floorTexture = new THREE.TextureLoader ().load ('textures/floor.png');
    floorTexture.anisotropy = 1;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(length, width);

    const floor = new THREE.Mesh(
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
        const borderWallBack = Wall.create({
            z: 0,
            x: actualMazeLength,
            orientation: 'left'
        }, cellSize);
        maze.addWalls([borderWallBack]);

        const borderWallFront = Wall.create({
            z: width - 1,
            x: actualMazeLength,
            orientation: 'right'
        }, cellSize);
        maze.addWalls([borderWallFront]);
    }

    // North and South walls
    for (let actualMazeWidth = 0; actualMazeWidth < width; actualMazeWidth++) {
        const borderWallRight = Wall.create({
            z: actualMazeWidth,
            x: length - 1,
            orientation: 'front'
        }, cellSize);
        maze.addWalls([borderWallRight]);

        const borderWallLeft = Wall.create({
            z: actualMazeWidth,
            x: 0,
            orientation: 'back'
        }, cellSize);
        maze.addWalls([borderWallLeft]);
    }

    return maze;
}

export default {create};
