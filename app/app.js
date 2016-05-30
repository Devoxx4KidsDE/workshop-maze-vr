
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

    const mazeContainer = document.createElement ('div');
    mazeContainer.innerHTML = `
        <div id="maze-container">
            <div id="maze">
                <div id="controls"></div>
                <div id="player-name" class="player-information"></div>
                <div id="items" class="items">
                    <h1>Items</h1>
                </div>
            </div>
        </div>
    `;

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
