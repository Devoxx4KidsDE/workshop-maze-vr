![Devoxx4Kids](http://www.devoxx4kids.de/wp-content/uploads/2015/07/cropped-header_hp.jpg)

[![devDependency Status](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr/dev-status.svg)](https://david-dm.org/Devoxx4KidsDE/workshop-maze-vr#info=devDependencies)


# Devoxx4Kids Workshop - Maze VR

Designed for a devoxx4kids workshop to show children how to do objective programming
and see what their maze in virtual reality look like

![stereoscopic view](https://raw.githubusercontent.com/Devoxx4KidsDE/workshop-maze-vr/master/presentation/screenshot-splitscreen.png)

There is even an editor available where you can hack your maze online 🎉 🎉

➡ http://devoxx4kidsde.github.io/workshop-maze-vr/build/?editor=true

# How To

## Requirements

* installed NodeJS version 6.x
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

The example maze now available at http://localhost:8080/app


## Hack your maze

So how to create your own maze you may ask?

1. the simplest way would be to open `app/examples/example.js` and start hacking :-)
2. a second option would be to create a new file (e.g. `app/examples/myAwesomeMaze.js`) and to adjust `app/app.js` to load the correct file.

To learn how to create walls and portals please see the [presentation handout](https://github.com/Devoxx4KidsDE/workshop-maze-vr/blob/master/presentation/workshop-maze-vr_handout_ger.pdf).

# Notes

Hacking your maze in a simple text editor can be annoying.
Syntax errors and friends (e.g. a missing colon creating a new wall properties) are not noticed until the application runs in the browser.
Therefore you can start a linting tool called [eslint](https://github.com/eslint/eslint).
This tool does a static code analysis (e.g. finding missing colons) and prints those errors on the terminal.

```
npm run lint
```

While hacking the maze you maybe don't want to start this task over and over again.
Therefore you can start another npm task that triggers the linting automatically after you have saved a file.

```
npm run lint:watch
```

Now you should have a look at the terminal after saving the file.
If you see an error like below you first have to fix it. Otherwise you will only see a black screen in the browser.
If you don't see any errors printed go on and reload the browser.

_(The following error message says that there is an unexpected colon that has to be removed in the `example.js` file on line 18 column 27)_

```
> devoxx4kids-workshop-maze-vr@1.0.0 lint /devoxx4kids/workshop-maze-vr
> eslint ./app


/devoxx4kids/workshop-maze-vr/app/examples/example.js
  18:27  error  Parsing error: Unexpected token ,

✖ 1 problem (1 error, 0 warnings)
```

# Dependencies

This project is based on:
* [three.js](http://threejs.org/)
* [threeVR](https://github.com/richtr/threeVR)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [Maze3D](https://github.com/agar3s/maze3D)

Have fun.
