var path = require('path')
var fs = require('fs');
var stego = require('../messageProcessing.js');

module.exports = {

  encodeMessage: function (req, res, next) {

    //expect to get a picture back, and send it in the res
    //encode(img, message, callback)
    console.log('about to encode the message');

    // console.log(typeof req.body.message);
    console.log(req.body.message);

  	stego.encode('cho', req.body.message, function(err, imageFileName) {
      console.log('done encoding, about to serve the file');
      // var file = fs.createReadStream(__dirname + '/../cho.png');
      // res.pipe(file);

      // var img = fs.readFileSync(__dirname + '/../cho.png');

      console.log('this is the file name i got back from encode: ',imageFileName);
      res.sendFile(imageFileName);

      // res.on('finish',function() {
      //   console.log('pipe is done');
      // });

  	});

  }

};
