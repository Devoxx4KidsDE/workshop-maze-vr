
System.import ('./examples/example.js').then (function (maze) {
    render ();
    maze.default.start ();
}).catch (function (error) {
    console.error (error.message, error.stack);
    fetch ('/api/log', {
        method: 'POST',
        body: error.stack
    });
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
