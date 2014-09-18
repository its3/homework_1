var xhr = new XMLHttpRequest();
xhr.open( 'get', 'exampleData.json', true );
xhr.onload=function() {
    var json = this.responseText;
    var data = JSON.parse( json );
    renderContactsAsTemplate( data );
};

xhr.send();


function getJSON( path, callback ) {
    var xhr = new XMLHttpRequest();
    xhr.open( 'get' , path , true );
    xhr.onload=function() {
        var json = this.responseText;
        var data = JSON.parse( json );
        callback( data );
    };
    
    xhr.send();
}

var renderContacts = renderContactsAsTemplate;

getJSON( 'exampleData.json' , renderContacts );

getJSONP( path ) {
    var jsonp = document.createElement("script");
    jsonp.src=path;
    document.body.appendChild(jsonp);
    
}

getJSONP( 'exampleData.js');