var contacts = [{  "id": 1,
    "firstName": "Ethan",
    "initials": "A",
    "lastName": "House",
    "created": "09/08/14",
    "nickname": "E-boy",
    "email": "eboy@gmail.com",
    "phoneNumber": 4024658945,
    "address": {
        "addressLine1": "8012 83rd st",
        "addressLine2": "",
        "city": "Lincoln",
        "state": "NE",
        "zipCode": "68506",
        "country": "USA"
    }
}];

function renderContactWithTemplate(contacts){
    var container = document.querySelector('.contact-template');

    contacts.map( handlebars.templates.contact ).forEach(function(contactHTML){
        container.innerHTML += contactHTML;
    });
}

var renderContact = renderContactWithTemplate;

renderContactWithTemplate( contacts );

//getJSONP( '/Data/exampleData.js' );