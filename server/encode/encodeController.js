var path = require('path')
var fs = require('fs');
var stego = require('../lib/steg.js');

module.exports = {

  encodeMessage: function (req, res, next) {

    //expect to get a picture back, and send it in the res
    //encode(img, message, callback)
  	stego.encode('cho', req.body.message, function(err, imageFileName) {
  		fs.readFile(imageFileName, function(err, data) {
  			if(err) throw err;
  			res.send(data);
  		});
  	});

  }

};
