var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

// serve static elements
app.use(express.static(path.resolve(__dirname + '/../test_assets'))) // INSERT REAL ASSET PATH

// Request Handling 
// 'homepage'
app.get('/', function(req, res) {
  res.status(200).send('you posted GET request to HOMEPAGE');
});

app.listen(8000);
console.log("listening in on port 8000")
module.exports = app;


