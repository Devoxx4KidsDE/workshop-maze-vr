function draw({id, text}) {
    document.getElementById(id).innerHTML = text;
}

function add({id, text}, parentId) {
    var div = document.createElement('div');
    div.innerHTML = text;
    div.id = id;
    document.getElementById(parentId).appendChild(div);
}

export default {draw,add}
