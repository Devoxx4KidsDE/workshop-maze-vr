
Promise.all ([
    load ('./maze/mazeEvaluator'),
    load ('./examples/example.js')
]).then (function start ([ mazeEvaluator, initialExampleMaze ]) {

    var activeMaze = null;

    function evalMaze (mazeBuilderFunctionBodyString) {
        prepareHtml ();

        if (activeMaze) {
            activeMaze.stop ();
        }

        const maze = mazeEvaluator.evaluate (mazeBuilderFunctionBodyString);
              maze.start ();

        activeMaze = maze;
    }

    function updateMaze (editor) {
        const code = editor.getValue ();
        evalMaze (getFunctionBodyString (code));
    }

    function updateEditor (mazeBuilder) {
        // \x20 -> whitespace but NOT line break
        const bodyString = mazeBuilder.build.toString ().replace (/\x20\x20/gm, ' ');
        editor.setValue (bodyString, 1);
        editor.selection.moveCursorToPosition({row: 0, column: 0});

        return editor;
    }

    const showEditor = window.location.search.split (/[?&]/).map (p => p.split ('=')).some (function (p) {
        return p[0] === 'editor' && p[1] === 'true';
    });

    if (!showEditor) {
        evalMaze (getFunctionBodyString (initialExampleMaze.build));
        return;
    }

    renderEditor ();

    const editor = ace.edit ('editor');
          // editor.setOption  ('showInvisibles', true);
          editor.getSession ().setTabSize (2);
          editor.getSession ().setUseSoftTabs (true);
          editor.getSession ().setMode ('ace/mode/javascript');

    editor.commands.addCommand({
        name: 'save',
        bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
        exec: updateMaze
    });

    document.getElementById ('save').addEventListener ('click', () => updateMaze (editor));

    const    editorContainer = document.querySelector ('.editor-container');

    if      (editorContainer.requestFullscreen   ) var exitFullscreen = 'fullscreenchange';
    else if (editorContainer.mozRequestFullScreen) var exitFullscreen = 'mozfullscreenchange';
    else                                           var exitFullscreen = 'webkitfullscreenchange';

    var fullscreen = false;
    document.addEventListener (exitFullscreen, () => {
        fullscreen = !fullscreen;
        editorContainer.style.display = fullscreen ? 'none' : 'flex';
    }, false);


    document.getElementById ('gotham-city-button').addEventListener ('click',
        () => loadMaze ('gotham').then (updateEditor).then (updateMaze));

    document.getElementById ('portal-example-button').addEventListener ('click',
        () => loadMaze ('portal').then (updateEditor).then (updateMaze));

    updateEditor (initialExampleMaze);
    updateMaze   (editor);
});

function loadMaze (name) {
    if (name === 'gotham') {
        return load ('./examples/gotham_city.js');
    }
    if (name === 'portal') {
        return load ('./examples/portalExample.js');
    }
    throw new Error (`${name} is an unknown maze :/`);
}

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

function renderEditor () {
    const container = document.createElement ('aside');

    container.classList.add ('editor-container');
    container.innerHTML = `
        <h1>Maze Builder</h1>
        <div id="editor" class="editor"></div>
        <button id="save" class="save-button"><span>Speichern (oder Strg + S)</span></button>
        <div>
            <h2>für dich bereits vorbereitet:</h2>
            <ul class="example-list">
                <li class="example-list-item">
                    <button id="gotham-city-button">Gotham City</button>
                </li>
                <li class="example-list-item">
                    <button id="portal-example-button">Portals</button>
                </li>
            </ul>
        </div>
    `;

    document.body.insertBefore (container, document.body.firstChild);
}
