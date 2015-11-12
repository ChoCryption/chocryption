var fs = require('fs');
var uuid = require('uuid');
var path = require('path');

module.exports = {

	decodeMessage: function (req, res, next) {

    // //extract the image from the data, and send it into the service that decodes messages
    // var image = '';
    // var imageId = uuid.v1();
    // var imgExt = 

    // req.on('data', function (data) {
    // 	image += data;
    // });
    // req.on('end', function () {
    // 	fs.writeFile("../temp/"+imageId+".jpeg", image, 'binary', function(err) {
    // 		if(err) {
    // 			console.log(err);
    // 		} else {
    // 			console.log("The file was saved!");
    // 		}
    // 	}
    // }
  }
  //expect to get a message back, and send it in the res

};
