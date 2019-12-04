var DataStore = require('nedb');
var DB_FILE_NAME = __dirname + "/contacts.json";

var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});

module.exports = db;