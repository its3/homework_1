var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Connect to our mongod server
mongoose.connect('mongodb://'+ (process.env.IP || 'localhost') + '/contacts');
//load contacts model
var contacts = require('./Models/contact');
var groups = require('./Models/groups');
var user = require('./Models/user');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ensureLogin = require('connect-ensure-login');
var ensureAuthenticated = ensureLogin.ensureAuthenticated;

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

// cookieParser() and session() need to be initialized before passport.
app.use(cookieParser('Courage, dear heart.'));
app.use(session({
    secret: 'What makes a king out of a slave? Courage!',
    resave: true,
    saveUninitialized: true
}));

// Configure passport.
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Initialize passport.
app.use(passport.initialize());
app.use(passport.session());

app.all('/contacts/*', ensureAuthenticated('/login'));

// Parse the body of 'post' requests
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    var user = req.user;
    if (user) {
        res.locals.user = {
            username: user.username
        };
    }
    next();
});

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
    if (res.locals.user) {
    
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
    
        req.user.findGroups().sort('name').exec(function(err, groups) {
            req.user.findContacts().limit(contactsPerPage).skip((page - 1) * contactsPerPage).sort({lastName: 1, firstName: 1}).exec(function(err, contacts) {
                res.render('index', {
                    title: "contacts",
                    groups: groups,
                    user: res.locals.user,
                    contacts: contacts,
                    numPages: numPages,
                    currentPage: (currentPage - page),
                    nextPage: (page + 1),
                    previousPage: (page - 1)
                });
            });
        });
    } else {
        res.render('index', {
            title: "contacts"
        });
    }
});

// List all contacts
app.get('/Contacts', function(req, res, next) {
    // Currently, just redirect to the homepage.
    res.redirect('/');
});

app.get('/contacts/add', function(req, res, next) {
    req.user.findGroups().sort('name').exec(function(err, groups) {
        res.render('addContact', {
            title: "New Contact",
            groups: groups
        });
    });
});

app.post('/contacts/add', saveContact);

app.get('/contacts/search', function(req, res, next) {
    req.user.findContacts().sort({lastName: 1, firstName: 1}).exec(function (err, contacts) {
        res.render('search', {
            title: "Search Contacts",
            contacts: contacts
        });
    });
});

app.post('/contacts/search', search);

app.get('/contacts/addGroup', function(req, res, next) {
    res.render('addGroup', {
        title: "New Group",
    });
});

app.post('/contacts/addGroup', saveGroup);

app.get('/contacts/deleteGroup', function(req, res, next) {
    req.user.findGroups().sort('name').exec(function(err, groups) {
        res.render('deleteGroup', {
            title: "Delete Group",
            groups: groups
        });
    });
});

app.post('/contacts/deleteGroup', deleteGroup);

app.get('/register', function(req, res, next) {
    res.render('register', {
            title: "Contacts | Create a new account"
        });
});

app.post('/register', register);

app.get('/login', function(req, res, next) {
    res.render('login', {
        title: "Contacts | Log in",
        user: req.user
    });
});

app.post('/login', login);

app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

app.get('/:groupSelect', function(req, res, next) {
    if (res.locals.user) {

        var group =  req.params.groupSelect;
        
        req.user.findContactsInGroup(group).count(function (err, counts) {
        
            var page = parseInt(req.query.page, 10) || 1;
    
            if(isNaN(page)) {
                page = 1;
            }
    
            var contactsPerPage = 5;
    
            var currentPage = Math.ceil( counts / ( contactsPerPage ));
    
            if (currentPage === 0) {
                currentPage = 1;
            }
    
            var Pages = ((( counts / contactsPerPage ) / 1 ) + 1 ) ;
    
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
    
            req.user.findGroups().sort('name').exec(function(err, groups) {
                req.user.findContactsInGroup(group).limit(contactsPerPage).skip((page - 1) * contactsPerPage).sort({lastName: 1, firstName: 1}).exec(function(err, contacts) {
                    res.render('index', {
                        title: "contacts",
                        group: group,
                        user: req.user,
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
    } else {
        res.render('index', {
            title: "contacts"
        });
    }
});

function login(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', {
                title: "Contacts | Log in",
                notification: {
                    severity: 'error',
                    message: "The username and password you provided is incorrect. Please try again."
                }
            });
        }
        // Log the user in and redirect to the homepage.
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

function register(req, res, next) {
    user.register(new user({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', {
                title: "Contacts | Create a new account",
                notification: {
                    severity: "error",
                    message: "Unable to register user: " + err.message
                },
                user: user
            });
        }
        // Authenticate (log in) the new user.
        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
}

function search(req, res, next) {
    var query = req.user.findContacts();

    var firstName = req.body.firstName;

    if(firstName) {
        try {
                firstName = new RegExp(firstName);
            }
            catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            firstName: firstName
        });
    }

    var lastName = req.body.lastName;

    if(lastName) {
        try {
                lastName = new RegExp(lastName);
            }
            catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            lastName: lastName
        });
    }

    var nickname = req.body.nickname;

    if(nickname) {
        try {
                nickname = new RegExp(nickname);
            }
            catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            nickname: nickname
        });
    }

    var email = req.body.email;

    if(email) {
        try {
                email = new RegExp(email);
            }
            catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            email: email
        });
    }

    var city = req.body.city;

    if(city) {
        try {
                city = new RegExp(city);
            }
            catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            city: city
        });
    }

    var state = req.body.state;

    if(state) {
        try {
            state = new RegExp(state);
            }
        catch (e) {
                console.warn("Bad regex pattern: %s", e);
            }
        query.and ({
            state: state
        });
    }
    
    query.sort({lastName: 1, firstName: 1});

    query.exec(function (err, query) {
       res.render('search', {
           title: "Search Contacts",
           contacts: query
       });
    });

}

function saveGroup(req, res, next) {
    if (req.body.action === 'delete') {
        return deleteGroup(req, res, next)
    }

    req.user.findGroupById(req.params.id, function(err, group) {

        if(!group) {
            group = req.user.newGroup();
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

    req.user.findGroupByName(req.body.groupName, function(err, group) {
        req.user.findContactsInGroup(group[0].name, function (err, contacts) {
            if(contacts.length > 0) {
                res.render('err', {
                    notification: {
                        message: 'Please delete all contacts in group "'
                        + group[0].name + '" before deleteing the group.'
                    }
                })
            }

            if (contacts.length === 0) {
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
            }
        });
    });
}

function saveContact(req, res, next) {

    if (req.body.action === 'delete') {
        return deleteContact(req, res, next);
    }

    req.user.findContactById(req.params.id, function(err, contact) {

        if (!contact) {
            contact = req.user.newContact();
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

    req.user.findContactById(req.params.id, function(err, contact) {

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
    req.user.findContactById(req.params.id, function(err, contact) {

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
    req.user.findGroups().exec(function(err, groups) {
        req.user.findContactById(req.params.id, function(err, contact) {

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
