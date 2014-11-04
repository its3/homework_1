var mongoose = require('mongoose');
var contacts = require('./contact');
var groups = require('./groups');

// Define the schema for a user
var user = new mongoose.Schema({
    username: {type: String, required: true, index: { unique: true}}
});

user.plugin(require('passport-local-mongoose'));

user.methods.newContact = function() {
    var contact = new contacts();
    contact.user_id = this._id;
    return contact;
};

user.methods.newGroup = function() {
    var group = new groups();
    group.user_id = this._id;
    return group;
};

user.methods.findContacts = function(callback) {
    return contacts.find({
        user_id: this._id
    }, callback);
};

user.methods.findGroups = function(callback) {
    return groups.find({
        user_id: this._id
    }, callback);
};

user.methods.findContactById = function(id, callback) {
    return contacts.findOne({
        user_id: this._id,
        _id: id
    }, callback);
};

user.methods.findGroupById = function(id, callback) {
    return groups.findOne({
        user_id: this._id,
        _id: id
    }, callback);
};

user.methods.findContactsInGroup = function(group, callback) {
    return contacts.find({
        user_id: this._id,
        group: group
    }, callback);
};

user.methods.findGroupByName = function(name, callback) {
    return groups.find({
        user_id: this._id,
        name: name
    }, callback);
};

// Export the model
var users = mongoose.model('user', user);
module.exports = users;