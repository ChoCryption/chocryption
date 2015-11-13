var path = require('path')
var fs = require('fs');
var stego = require('../messageProcessing.js');

module.exports = {

  encodeMessage: function (req, res, next) {

    console.log('this is the origin',req.headers.origin);

    //expect to get a picture back, and send it in the res
    //encode(img, message, callback)
    console.log('about to encode the message');

    // console.log(typeof req.body.message);
    console.log(req.body.message);

  	stego.encode('cho', req.body.message, function(err, imageFileName) {
      console.log('done encoding, about to serve the file');

      console.log('this is the file name i got back from encode: ',imageFileName);

      var fileName = path.parse(imageFileName).name
      console.log(fileName);

      var imgUrl = req.headers.origin+'/img/'+fileName

      res.send({image: imgUrl});

  	});

  }

};
