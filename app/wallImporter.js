function getWalls({name,cellSize}) {
    return fetch(name + '.json').then(response => response.json()).then(walls => {
        return walls.map((w, i) => {
            w = Object.assign(w);
            w.texture = i % 2 ? 'wall' : 'wall_d4k';
            return create(w, cellSize);
        });
    });
}

// 
//wallImporter.getWalls({name:'walls.json', options.cellSize}).then(function(walls) {
//    maze.addWalls(walls);
//});

export {getWalls}