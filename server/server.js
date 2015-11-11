var express = require('express');
var path = require('path');

var app = express();

// serve static elements
app.use(express.static(path.resolve(__dirname + '/../test_assets'))) // <------ Insert real asset path


// let's say there is an 
app.get('/', function(req, res) {
  res.write(path.resolve(__dirname + '/../test_assets/index.html'));
});

app.listen(8000);
console.log("listening in on port 8000")
module.exports = app;
