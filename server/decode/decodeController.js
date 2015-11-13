var fs = require('fs');
var stego = require('../lib/steg.js');

module.exports = {

	decodeMessage: function (req, res, next) {

    //take req.file.path is the path and file name
    var originalFileName = req.file.originalname.split('.')

    //call decode function, on
    //decode(img, callback)
    stego.decode(req.file.path, originalFileName.pop(), function(err, message) {
	  res.send(message);
	});

  }

};
