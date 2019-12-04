const app = require('./server.js');

var port = (process.env.PORT || 3000);

console.log("Starting API server at "+port);


app.listen(port);

console.log("Server ready!");