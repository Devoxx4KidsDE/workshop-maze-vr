
Promise.all ([
    load ('./maze/mazeEvaluator'),
    load ('./examples/example.js')
]).then (function start ([ mazeEvaluator, mazeBuilder ]) {
    render ();
    const maze = mazeEvaluator.evaluate (getFunctionBodyString (mazeBuilder.build));
          maze.start ();
});

function load (name) {
    return System.import (name);
}

function getFunctionBodyString (fn) {
    return fn.toString ().match(/function[^{]+\{([\s\S]*)\}$/) [1];
}

function render () {
    const div = document.createElement.bind (document, 'div');

    const mazeContainer = div();
          mazeContainer.id = 'maze';

    const controls = div();
          controls.id = 'controls';

    const player = div();
          player.id = 'player-name';
          player.classList.add ('player-information');

    const items = div();
          items.id = 'items';
          items.classList.add ('items');
          items.innerHTML = '<h1>Items</h1>';

    const body = document.body;
          body.appendChild (mazeContainer);
          body.appendChild (controls);
          body.appendChild (player);
          body.appendChild (items);
          body.removeChild (document.querySelector ('#loading'));
}
