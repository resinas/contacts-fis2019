const mongoose = require('mongoose');

const ENV_URL = 'mongodb://' + process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+"@"+process.env.MONGODB_HOST+"/"+process.env.MONGODB_DATABASE;
console.log("ENV:"+ENV_URL);
const DB_URL = (! process.env.MONGODB_HOST) ? 'mongodb://mongo/test' : ENV_URL;

console.log("DB:" + DB_URL)

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true });
}

module.exports = dbConnect;