const mongoose = require('mongoose');

const dbURL = 'mongodb://127.0.0.1:27017/fullstackopen?retryWrites=true&w=majority';

db = mongoose.createConnection();
db.set('strictQuery', false);
db.set('timeout', 1000);

console.log(`Connecting to database ${dbURL}`);
db.openUri(dbURL)
    .then(result => { console.log(`Connected to database ${dbURL}`); })
    .catch(err => { console.log(`Error connecting to database: ${err.message}`); });

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true,
    },
    number: {
        type: String,
        minlength: 4,
        required: true,
    }
});

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Contact = db.model('Contacts', contactSchema);

module.exports = Contact;
