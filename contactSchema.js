/**
 * Contact Schema
 * ---------------
 * This is a rough representation of the data we are storing for each contact.
 *
 * The Contact is the atomic unit of the addressing service. Users create
 * multiple contacts to keep track of people.
 *
 * A Contact is set of attributes that identify ways to communicate with a person.
 */
var contactSchema = {
    /**
     * id - A Number to serve as a system-generated unique identifier.
     */
    id: Number,

    /**
     * firstName - A String containing the first name of the contact.
     */
    firstName: String,
    
    /**
     * initials - A string containing the contact's initials.
     */
     initials: String,

    /**
     * lastName - A String containing the last name of the contact.
     */
    lastName: String,

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
    phoneNumber: Number,
    
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
    }

    /**
     * category - We may eventually want to identify the type of content that the
     *        conact represents, such as business, friend, associate, etc.
     *
     * category : String
     */
};