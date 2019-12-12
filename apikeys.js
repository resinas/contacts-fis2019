const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const apiKeySchema = new mongoose.Schema({
    user: String,
    apikey: String
});

apiKeySchema.pre('save', function(next) {
    const user = this;
    user.apikey = uuidv4();
    next();
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;