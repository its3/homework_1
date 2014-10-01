var express = require('express');
var hbs = require('hbs');
// Load our contacts.json data file
var contacts = require('./public/data/exampleData.json');


// Create a new express app.
var app = express();

// Register the hbs engine for the 'html' extension
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// Set the port and ip address (just as a convenience)
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');

// Serve files in /public as static files
app.use(express.static('public'));

// Register the the index route
app.get('/', function(req, res, next) {
    res.render('index', {
        title: "Contact List",
        contacts: contacts
    });
});

// List all contacts
app.get('/Contacts', function(req, res, next) {
    // Currently, just redirect to the homepage.
    res.redirect('/');
});

app.get('/contacts/add', function(req, res, next) {
    res.render('addContact', {
        title: "New contact",
    });
});

// Respond to requests for a specific contact
app.get('/Contacts/:id', function(req, res, next) {
    var contact = contacts.filter(function(contact) {
        return contact.id == req.params.id;
    })[0];

    if (contact) {
        res.render('contact', {
            title: "contact: " + contact.lastName + ", " + contact.firstName,
            contacts: contact
        });
    }
    else {
        res.render('Contact', {
            title: "Contact does not exist.",
            notification: {
                severity: "error",
                message: "No contact exists with that id."
            }
        });
    }
});

app.get('/contacts/:id/edit', function(req, res, next) {
    var contact = contacts.filter(function(contact) {
        return contact.id == req.params.id;
    })[0];

    if (contact) {
        res.render('contactEdit', {
            title: "contact: " + contact.lastName + ", " + contact.firstName,
            contacts: contact
        });
    }
    else {
        res.render('Contact', {
            title: "Contact does not exist.",
            notification: {
                severity: "error",
                message: "No contact exists with that id."
            }
        });
    }
});

app.get('/contacts/:id/delete', function(req, res, next) {
    var contact = contacts.filter(function(contact) {
        return contact.id == req.params.id;
    })[0];

    if (contact) {
        res.render('contactDelete', {
            title: "contact: " + contact.lastName + ", " + contact.firstName,
            contacts: contact
        });
    }
    else {
        res.render('Contact', {
            title: "Contact does not exist.",
            notification: {
                severity: "error",
                message: "No contact exists with that id."
            }
        });
    }
});


// 404 Not Found handler
app.use(function(req, res) {
    console.warn('404 Not Found: %s', req.originalUrl);
    res.status(404).render('index', {
        notification: {
            severity: "error",
            message: "The page you requested doesn’t exist."
        }
    });
});


// 500 Internal Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(500).render('index', {
        notification: {
            severity: "error",
            message: "I’m so sorry, but something is wrong and internal\
                      errors are occuring. The developers have\
                      been alerted and will (hopefully) have the issue resolved\
                      shortly."
        }
    });
});

// Start the server
var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log("Contact service up on http://%s:%s",
        address.address, address.port);
});
