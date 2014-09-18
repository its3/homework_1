function createContactElement( contact ) {
    var contactElement = document.createElement('article');
    contactElement.className = 'contact';

    var titleElement = document.createElement('h1');

    titleElement.appendChild(document.createTextNode(contact.lastName + ", " + contact.firstName ) );

    if ( contact.initials ) {
        titleElement.appendChild( document.createTextNode( " " + contact.initials ) );

    }
    
    if ( contact.nickname ) {
        titleElement.appendChild( document.createTextNode( " (" + contact.nickname + ")" ) );

    }

    contactElement.appendChild( titleElement );
    
    var createdElement = document.createElement('div');
    
    createdElement.appendChild( document.createTextNode( contact.created ) );
    contactElement.appendChild( createdElement );    
    
    var emailElement = document.createElement('div');
    
    emailElement.appendChild( document.createTextNode( contact.email ) );
    contactElement.appendChild( emailElement );    
    
    if ( contact.phoneNumber ) {
        var phoneElement = document.createElement('div');
        phoneElement.appendChild( document.createTextNode( contact.phoneNumber ) );

        contactElement.appendChild( phoneElement );
    }
    
    if ( contact.address.addressLine1 ) {
        var addressElement = document.createElement('div');
        addressElement.appendChild( document.createTextNode( contact.address.addressLine1 ) );

        contactElement.appendChild( addressElement );
    }

    if ( contact.address.addressLine2 ) {
        var address1Element = document.createElement('div');
        address1Element.appendChild( document.createTextNode( contact.address.addressLine2 ) );

        contactElement.appendChild( address1Element );
    }
    
    if ( contact.address.city ) {
        var address2Element = document.createElement('div');
        address2Element.appendChild( document.createTextNode( contact.address.city + ", " + contact.address.state + " " + contact.address.zipCode ) );

        contactElement.appendChild( address2Element );
    }
    
    if ( contact.address.country ) {
        var address5Element = document.createElement('div');
        address5Element.appendChild( document.createTextNode( contact.address.country ) );

        contactElement.appendChild( address5Element );
    }

    return contactElement;
}

var contact = {  
    "id": 1,
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

var container = document.querySelector('.contact-list');

var contactElement = createContactElement( contact );
container.appendChild( contactElement );