const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number
});

contactSchema.methods.cleanup = function() {
    return {name: this.name, phone: this.phone};
}

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;