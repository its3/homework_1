var mongoose = require('mongoose');

// Connect to our mongod server
mongoose.connect('mongodb://'+ (process.env.IP || 'localhost') + '/contacts');

// Define the schema for a bookmark
var schema = new mongoose.Schema({
    /**
     * firstName - A String containing the first name of the contact.
     */
    firstName: {type: String, required: true},
    
    /**
     * initials - A string containing the contact's initials.
     */
    initials: String,

    /**
     * lastName - A String containing the last name of the contact.
     */
    lastName: {type: String, required: true},

    /**
     * created - The Date and time that the bookmark was created.
     */
    created: Date,

    /**
     * nickname - A String providing a favorite name for the contact.
     */
    nickname: String,
    
    /**
     * email - A string containing the contact's email address.
     */
    email: String,
    
    /**
     * phoneNumber - A number containing the contact's phoneNumber.
     */
    phoneNumber: String,
    
    /**
     * address - An Object to hold address information.
     */
    address: {
        /**
         * addressLine1 - A string containing the first contact address line.
         */
        addressLine1: String,
        
        /**
         * addressLine2 - A string containing the second contact address line.
         */
        addressLine2: String,
        
        /**
         * city - A string containing the contact's city.
         */
         city: String,
         
         /**
         * state - A string containing the contact's state.
         */
         state: String,
         
         /**
         * zipCode - A string containing the contact's zip code.
         */
         zipCode: String,
         
         /**
         * country - A string containing the contact's country.
         */
         country: String
    }});

// Export the model
var contact = mongoose.model('contact', schema);
module.exports = contact;