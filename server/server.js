var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

// serve static elements
app.use(express.static(path.resolve(__dirname + '/../client/src/pages/'))) // INSERT REAL ASSET PATH

// Request Handling 
// 'homepage'
app.get('/', function(req, res) {
  res.status(200).send('you made a GET request to HOMEPAGE'); // INSERT REAL ACTION
});

app.post('/', function(req, res) {
  res.status(200).send('you made a POST request to HOMEPAGE'); // INSERT REAL ACTION
  res.end();
});

// hypothetical 'other page'
// app.get('client/#/pages/home.html', function(req, res) {
app.get('/something', function(req, res) {
  res.status(200).send('you made a GET request to ENCRYPT'); // INSERT REAL ACTION
});

app.listen(8000);
console.log("listening in on port 8000")
module.exports = app;


