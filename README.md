![Devoxx4Kids](http://www.devoxx4kids.de/wp-content/uploads/2015/07/cropped-header_hp.jpg)

[![devDependency Status](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr/dev-status.svg)](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr#info=devDependencies)


# Devoxx4Kids Workshop - Maze VR

Designed for a devoxx4kids workshop to show children how to do objective programming
and see what their maze in virtual reality look like

![stereoscopic view](https://raw.githubusercontent.com/Devoxx4KidsDE/workshop-maze-vr/master/presentation/screenshot-splitscreen.png)

# How To

## Requirements

* installed NodeJS version >= 0.12.xx
 * see https://nodejs.org/en/download/package-manager/ for more information (e.g. how to install)

## Start

Just clone this repository

```
git clone https://github.com/Devoxx4KidsDE/workshop-maze-vr.git
```

install all required dependencies

```
cd workshop-maze-vr
npm install
```

and once the dependencies are installed simply start the app with

```
npm start
```

The server is now available at http://localhost:8080

Port 8080 is the default. However, you can edit ``webpack.config.js`` to set a custom port if required:

```
var config = {
   port: 8080,
   host: '0.0.0.0'
};
```


## Hack your maze

So how to create your own maze you may ask?

1. the simplest way would be to open `app/examples/example.js` and start hacking :-)
2. a second option would be to create a new file (e.g. `app/examples/myAwesomeMaze.js`) and to adjust `app/app.js` to load the correct file.

To learn how to create walls and portals please see the [presentation handout](https://github.com/Devoxx4KidsDE/workshop-maze-vr/blob/master/presentation/workshop-maze-vr_handout_ger.pdf).

## Dependencies
This project is based on:
* [three.js](http://threejs.org/)
* [threeVR](https://github.com/richtr/threeVR)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [Maze3D](https://github.com/agar3s/maze3D)

Have fun.