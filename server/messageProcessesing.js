var stego = require('./lib/steg.js');
var path = require('path');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var lwip = require('lwip');

//Simple functional testing
// stego.encode('cho.png', 'testmessage', 'output7');

// stego.decode('output7.png', function(err, message) {
//   console.log(message);
//   return message;
// });

var pathToImages = './';

module.exports = {
  encode: function(imageName, message, callback) {
    //check image type here
    var image = [];
    var fullName = path.join(pathToImages, imageName);
    var fileBuffer = readChunk.sync(fullName, 0, 262);
    var imageType = fileType(fileBuffer);

    if (imageType.ext !== 'png') {
      lwip.open(fullName, imageType.ext, function(image) {
        image.writeFile(fullName + '.png', 'png', function(err) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            console.log('Image converted to png.');
            console.log('Beginning encode process...');
            stego.encode(fullName + '.png', message, function(err, encodeImageName) {
              if(err) {
                console.log(err);
                callback(err);
              } else {
                callback(null, encodeImageName);
              }
            });
          }
        });
      });
    } else if (imageType.ext === 'png') {
      lwip.open(fullName, 'png', function(err, image) {
        image.writeFile(fullName + '.png', 'png', function(err) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            console.log('Image converted to png.');
            console.log('Beginning encode process...');
            stego.encode(fullName + '.png', message, function(err, encodeImageName) {
              if(err) {
                console.log(err);
                callback(err);
              } else {
                callback(null, encodeImageName);
              }
            });
          }
        });
      });
    } else {
      console.log('Cannot recognize the filetype: ', imageType.ext);
      callback(new Error('Filetype is incorrect'));
    }
  },

  decode: function(image, callback) {
    var fullName = path.join(pathToImages, image);
    //Do we need to check file type here??
    stego.decode(fullName, function(err, message) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log('Message has been decoded successfully');
        callback(null, message);
      }
    });
  }
};

