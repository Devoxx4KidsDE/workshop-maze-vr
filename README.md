[![devDependency Status](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr/dev-status.svg)](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr#info=devDependencies)

# Devoxx4Kids Workshop - Maze VR

Designed for a devoxx4kids workshop to show children how to do objective programming and see what their maze in virtual reality look like

## Start

Just clone this repository and type ``npm install`` in the workshop-maze-vr directory. After the dependencies are installed start the server with ``npm start``.
The server is now available at http://localhost:4000

## Configuration

For setting up a local network based server edit ``webpack.config.js``:

```
var config = {
   port: 8080,
   host: '0.0.0.0'
};
```

## Dependencies
This project is based on:
* [three.js](http://threejs.org/)
* [threeVR](https://github.com/richtr/threeVR)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [Maze3D](https://github.com/agar3s/maze3D)

Have fun.
