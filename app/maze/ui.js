function draw({id, text}) {
    document.getElementById(id).innerHTML = text;
}

function add({id, text}, parentId) {
    var div = document.createElement('div');
    div.innerHTML = text;
    div.id = id;
    document.getElementById(parentId).appendChild(div);
}

function update(id, classId) {
    let element = document.getElementById(id);
    element.className = element.className + classId;
}

function pageTitle() {
    document.title = 'D4K-' + location.host.slice(11, 13) + ' - MazeVR';
}

export default {draw, add, update, pageTitle};
