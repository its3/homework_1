var mongoose = require('mongoose');

// Define the schema for a group
var schema = new mongoose.Schema({
    name: {type: String, required: true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    created: Date
});

// Export the model
var group = mongoose.model('group', schema);
module.exports = group;