function getJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', path, true);
    xhr.onload = function() {
        var data = JSON.parse(this.responseText);
        callback.call(this, data);
    };
    xhr.send();
}

function getJSONP(path) {
    var script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
}