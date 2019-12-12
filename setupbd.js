const mongoose = require('mongoose');
const dbConnect = require('./db');
const ApiKey = require('./apikeys');

dbConnect().then(
    () => {
        const user = new ApiKey({user: "fis"});
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log('user: ' + user.user + ", "+user.apikey + " saved.");
            }
        })
    }
)