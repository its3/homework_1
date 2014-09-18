function getJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', path, true);
    xhr.onload = function() {
        var data = JSON.parse( this.responseText );
        callback( data );
    };
    xhr.send();
}