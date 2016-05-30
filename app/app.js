
Promise.all ([
    load ('./maze/mazeEvaluator'),
    load ('./examples/example.js')
]).then (function start ([ mazeEvaluator, mazeBuilder ]) {

    function evalMaze (mazeBuilderFunctionBodyString) {
        prepareHtml ();
        const maze = mazeEvaluator.evaluate (mazeBuilderFunctionBodyString);
              maze.start ();
    }

    const editor = ace.edit ('editor');
          // editor.setOption  ('showInvisibles', true);
          editor.getSession ().setTabSize (2);
          editor.getSession ().setUseSoftTabs (true);
          editor.getSession ().setMode ('ace/mode/javascript');

    // \x20 -> whitespace but NOT line break
    const bodyString = mazeBuilder.build.toString ().replace (/\x20\x20/gm, ' ');
    editor.setValue (bodyString, 1);


    evalMaze (getFunctionBodyString (mazeBuilder.build));

    document.getElementById ('save').addEventListener ('click', () => {
        const code = editor.getValue ();
        evalMaze (getFunctionBodyString (code));
    });

    const    editorContainer = document.querySelector ('.editor-container');

    if      (editorContainer.requestFullscreen   ) var exitFullscreen = 'fullscreenchange';
    else if (editorContainer.mozRequestFullScreen) var exitFullscreen = 'mozfullscreenchange';
    else                                           var exitFullscreen = 'webkitfullscreenchange';

    var fullscreen = false;
    document.addEventListener (exitFullscreen, () => {
        fullscreen = !fullscreen;
        editorContainer.style.display = fullscreen ? 'none' : 'flex';
    }, false);
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

    const container = document.getElementById ('playground');
          container.appendChild (mazeContainer);

    const loadingElement = document.getElementById ('loading');
    if   (loadingElement) {
          loadingElement.parentNode.removeChild (loadingElement);
    }
}

function clearBody () {
    const mazeContainer = document.getElementById ('maze-container');
    if (  mazeContainer) {
          mazeContainer.parentNode.removeChild (mazeContainer);
    }
}
