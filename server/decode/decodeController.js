var fs = require('fs');
var path = require('path')
var stego = require('../messageProcessing.js');

module.exports = {

	decodeMessage: function (req, res, next) {
		console.log('starting decode');
		console.log(req.file);
		// res.send('hi');

    // call decode function, on
    // decode(img, callback)
    stego.decode(req.file.filename, function(err, message) {
    	console.log(message);
		  res.send(message);
		});

  }

};
