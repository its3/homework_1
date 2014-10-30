var mongoose = require('mongoose');

// Define the schema for a group
var groupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    created: Date
});

// Export the model
var group = mongoose.model('group', groupSchema);
module.exports = group;