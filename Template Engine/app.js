var templateSource = document.getElementById('contact-template').innerHTML;
var contactTemplate = Handlebars.compile( templateSource );


function createContactFromTemplate( contact ) {
    return contactTemplate( contact );

}

var contact = {  "id": 1,
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
};

var contactElement = createContactFromTemplate( contact );
var container = document.querySelector('.contact-template');


container.innerHTML += contactElement;

