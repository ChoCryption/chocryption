var fs = require('fs');
var uuid = require('uuid');
var path = require('path');

module.exports = {

	decodeMessage: function (req, res, next) {
    console.log(req);
    console.log(req.files);
    console.log(req.files.image);
    // console.log(req.files.file.path);

    // //extract the image from the data, and send it into the service that decodes messages
    // var image = '';
    // // var imageId = uuid.v1();
    // // var imgExt = 

    // req.on('data', function (data) {
    // 	image += data;
    // });
    // req.on('end', function () {
    //   console.log(image);
    // 	fs.writeFile(__dirname+'/tmp', image, function(err) {
    // 		if(err) {
    // 			console.log(err);
    // 		} else {
    // 			console.log("The file was saved!");
    // 		}
    // 	});
    // });
  }
  //expect to get a message back, and send it in the res

};
