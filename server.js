const passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
const Contact = require('./contacts');
require('./passport.js');

var BASE_API_PATH = "/api/v1";

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/contacts", 
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    console.log(Date() + " - GET /contacts");

    Contact.find({}, (err, contacts) => {
        if (err) {
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        } else {
            res.send(contacts.map((contact) => {
                return contact.cleanup();
            }));
        }
    });

});

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body;
    Contact.create(contact, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

module.exports = app;