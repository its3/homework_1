var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Connect to our mongod server
mongoose.connect('mongodb://'+ (process.env.IP || 'localhost') + '/contacts');
//load contacts model
var contacts = require('./Models/contact');
var groups = require('./Models/groups');


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

// Parse the body of 'post' requests
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req,res,next) {
    contacts.count(function (err, count) {
        res.querycount = count;
        next();
    });
});

app.use(function(req, res, next) {
    groups.count(function (err, count) {
        res.groupcount = count;
        next();
    });
});

// Register the the index route
app.get('/', function(req, res, next) {
    var page = parseInt(req.query.page, 10) || 1;
    
    if(isNaN(page)) {
        page = 1;
    }
    
    var contactsPerPage = 5;
    
    var currentPage = Math.ceil( res.querycount / ( contactsPerPage ));
    
    if (currentPage === 0) {
        currentPage = 1;
    }
    
    var Pages = ((( res.querycount / contactsPerPage ) / 1 ) + 1 ) ;
    
    var numPages = [];
    
    for( var i = 1; i < Pages; i++ ) {
        var temp = {
            numPages: i
        }
        numPages.push(temp);
    };
    
    if(numPages.length == 1) {
        numPages = [];
    }
    
    groups.find().exec(function(err, groups) {
        contacts.find().limit(contactsPerPage).skip((page - 1) * contactsPerPage).exec(function(err, contacts) {
            res.render('index', {
                title: "contacts",
                groups: groups,
                contacts: contacts,
                numPages: numPages,
                currentPage: (currentPage - page),
                nextPage: (page + 1),
                previousPage: (page - 1)
            });
        });
    });
});

// List all contacts
app.get('/Contacts', function(req, res, next) {
    // Currently, just redirect to the homepage.
    res.redirect('/');
});

app.get('/contacts/add', function(req, res, next) {
    groups.find().exec(function (err, groups) {
        res.render('addContact', {
            title: "New Contact",
            groups: groups
        });
    });
});

app.get('/contacts/search', function(req, res, next) {
    res.render('search', {
        title: "Search Contacts"
    });
});

app.get('/contacts/addGroup', function(req, res, next) {
    res.render('addGroup', {
        title: "New Group"
    });
});

app.post('/contacts/addGroup', saveGroup);

app.get('/contacts/deleteGroup', function(req, res, next) {
    groups.find().exec(function(err, groups) {
        res.render('deleteGroup', {
            title: "Delete Group",
            groups: groups
        });
    });
});

app.post('/contacts/deleteGroup', deleteGroup);

function saveGroup(req, res, next) {
    if (req.body.action === 'delete') {
        return deleteGroup(req, res, next)
    }
    
    groups.findById(req.params.id, function(err, group) {
        
        if(!group) {
            group = new groups();
            group.created = Date();
        }
        
        group.set({
           name: req.body.groupName 
        });
        
        group.save(function(err) {
            if (err) {
                res.render('addGroup', {
                    title: "Error saving group:" + group.name,
                    groups: groups,
                    contacts: contacts,
                    notification: {
                        severity: "error",
                        message: err
                    }
                });
            } else {
                res.redirect('/');
            }
        });
    });
}

function deleteGroup(req, res, next) {
    
    groups.find({name: req.body.groupName}, function(err, group) {

        if (group[0]) {
            console.warn("Deleting group:", group[0]);

            groups.remove(group[0], function(err) {
                if (err) {
                    res.render('deleteGroup', {
                        title: "Delete group failed!",
                        notification: {
                            severity: "error",
                            message: "Could not delete group: " + err
                        }
                    });
                }
                else {
                    res.redirect('/');
                }
            });
        }
        else {
            res.redirect('/');
        }
    });
}

app.post('/contacts/add', saveContact);

function saveContact(req, res, next) {

    if (req.body.action === 'delete') {
        return deleteContact(req, res, next);
    }

    contacts.findById(req.params.id, function(err, contact) {

        if (!contact) {
            contact = new contacts();
            contact.created = Date();
        }

        contact.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            initials: req.body.initial,
            nickname: req.body.nickname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            group: req.body.group,
            address: {
                addressLine1: req.body.addressl1,
                addressLine2: req.body.addressl2,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country
            }
        });

        contact.save(function(err) {
            if (err) {
                res.render('addContact', {
                    title: "Error saving contact:" + contact.firstName + contact.lastName,
                    contacts: contact,
                    groups: groups,
                    notification: {
                        severity: "error",
                        message: err
                    }
                });
            }
            else if (req.params.id != null) {
                res.redirect('/contacts/' + req.params.id);
            } else {
                res.redirect('/');
            }
        });
    });
}

function deleteContact(req, res, next) {

    contacts.findById(req.params.id, function(err, contact) {

        if (contact) {
            console.warn("Deleting contact:", contact);

            contacts.remove(contact, function(err) {
                if (err) {
                    res.render('contactEdit', {
                        title: "Delete contact failed!",
                        notification: {
                            severity: "error",
                            message: "Could not delete contact: " + err
                        }
                    });
                }
                else {
                    res.redirect('/');
                }
            });
        }
        else {
            res.redirect('/');
        }
    });
}

// Respond to requests for a specific contact
app.get('/Contacts/:id', function(req, res, next) {
    contacts.findById(req.params.id, function(err, contact) {

        if (contact) {
            res.render('contact', {
                title: "contact: " + contact.lastName + ", " + contact.firstName,
                contacts: contact,
                groups: groups
            });
        } else {
            res.render('contact', {
                title: "Contact does not exist.",
                notification: {
                    severity: "error",
                    message: "No contact exists with that id."
                }
            });
        }
    });
});

app.get('/contacts/:id/edit', function(req, res, next) {
    groups.find().exec(function(err, groups) {
        contacts.findById(req.params.id, function(err, contact) {
    
            if (contact) {
                res.render('contactEdit', {
                    title: "contact: " + contact.lastName + ", " + contact.firstName,
                    contacts: contact,
                    groups: groups
                });
            }
            else {
                res.render('contact', {
                    title: "Contact does not exist.",
                    notification: {
                        severity: "error",
                        message: "No contact exists with that id."
                    }
                });
            }
        });
    });
});

// Persist edits for a contact
app.post('/contacts/:id/edit', saveContact);
// Delete a contact
app.post('/contacts/:id/delete', deleteContact);

// 404 Not Found handler
app.use(function(req, res) {
    console.warn('404 Not Found: %s', req.originalUrl);
    res.status(404).render('err', {
        notification: {
            severity: "error",
            message: "The page you requested doesn’t exist."
        }
    });
});


// 500 Internal Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(500).render('err', {
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
