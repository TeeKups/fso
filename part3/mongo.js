const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/fullstackopen?retryWrites=true&w=majority';

db = mongoose.createConnection();
db.set('strictQuery', false);
db.set('timeout', 1000);
db.openUri(url);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = db.model('Contacts', contactSchema);

const getAll = () => {
    console.log("Contacts:");
    Contact.find().then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.number);
        });
        db.close();
    });
};

const addContact = (contactInfo) => {
    const contact = new Contact(contactInfo);
    contact.save().then(result => {
        db.close();
    });
};

if (process.argv.length === 2) {
    getAll();
} else if (process.argv.length === 4) {
    addContact({
        name: process.argv[2],
        number: process.argv[3]
    });
} else {
    console.log("Invalid arguments! Won't give help. Read the source code lol.");
}
