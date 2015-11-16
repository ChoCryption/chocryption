var express = require('express');

var app = express();

require('./router/middleware.js')(app, express);

app.listen(8000);
console.log("listening in on port 8000");

module.exports = app;


