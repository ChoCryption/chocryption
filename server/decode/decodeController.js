var fs = require('fs');
var stego = require('../lib/steg.js');

module.exports = {

	decodeMessage: function (req, res, next) {

    //call decode function, on
    //decode(img, callback)
  //   stego.decode(req.file.path, function(err, message) {
		//   res.send(message);
		// });
		console.log(res.file);

  }

};
