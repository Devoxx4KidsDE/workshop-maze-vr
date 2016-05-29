
function load (name) {
    return System.import (name);
}

function loadDefault (name) {
    return load (name).then (module => module.default);
}

Promise.all ([
    loadDefault ('./maze/mazen'),
    loadDefault ('./maze/player'),
    loadDefault ('./maze/wall'),
    loadDefault ('./maze/item'),
    load        ('./maze/wallTexture'),
    load        ('./examples/example.js')
]).then (function start ([ Maze, Player, Wall, Item, WallTexture, mazeBuilder ]) {
    render ();
    const maze = mazeBuilder.build (Maze, Player, Wall, Item, WallTexture);
          maze.start ();
});


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
