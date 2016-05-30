
Promise.all ([
    load ('./maze/mazeEvaluator'),
    load ('./examples/example.js')
]).then (function start ([ mazeEvaluator, mazeBuilder ]) {

    function evalMaze (mazeBuilderFunctionBodyString) {
        prepareHtml ();
        const maze = mazeEvaluator.evaluate (mazeBuilderFunctionBodyString);
              maze.start ();
    }

    evalMaze (getFunctionBodyString (mazeBuilder.build));
});

function load (name) {
    return System.import (name);
}

function getFunctionBodyString (fn) {
    return fn.toString ().match(/function[^{]+\{([\s\S]*)\}$/) [1];
}

function prepareHtml () {

    clearBody ();

    const div = document.createElement.bind (document, 'div');

    const controls = div();
          controls.id = 'controls';

    const player = div();
          player.id = 'player-name';
          player.classList.add ('player-information');

    const items = div();
          items.id = 'items';
          items.classList.add ('items');
          items.innerHTML = '<h1>Items</h1>';

    const playground = div();
          playground.id = 'maze';
          playground.appendChild (controls);
          playground.appendChild (player);
          playground.appendChild (items);

    const mazeContainer = div ();
          mazeContainer.id = 'maze-container';
          mazeContainer.appendChild (playground);

    const body = document.body;
          body.appendChild (mazeContainer);
          body.removeChild (document.querySelector ('#loading'));
}

function clearBody () {
    const mazeContainer = document.getElementById ('maze-container');
    if (  mazeContainer) {
        document.body.removeChild (mazeContainer);
    }
}
