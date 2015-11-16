var stego = require('./lib/steg.js');
var path = require('path');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var lwip = require('lwip');
var paths = require('./lib/util.js').paths;

module.exports = {
  encode: function(imageName, message, callback) {
    //check image type here
    var image = [];
    var fullName = path.join(paths.temp, imageName);
    var fileBuffer = readChunk.sync(fullName, 0, 262);
    var imageType = fileType(fileBuffer);

    if(!imageType) {
      console.log('Error, file is null');
      callback(new Error('File is not valid'));
    } else if (imageType.ext !== 'png') {
      lwip.open(fullName, imageType.ext, function(err, image) {
        if(err) {
          console.log('Problem opening');
          callback(err);
        }
        fullName = path.join(paths.temp, path.basename(fullName, imageType.ext) + 'png');
        image.writeFile(fullName, 'png', function(err) {
          if (err) {
            console.log(err);
            callback(new Error('did not work to write'));
          } else {
            console.log('Image converted to png.');
            console.log('Beginning encode process...');
            stego.encode(fullName, message, function(err, encodeImageName) {
              if(err) {
                console.log('encode non png: ', err);
                callback(err);
              } else {
                console.log('Image is now encoded.');
                callback(null, encodeImageName);
              }
            });
          }
        });
      });
    } else if (imageType.ext === 'png') {
      lwip.open(fullName, 'png', function(err, image) {
        if(err) {
          console.log('Error opening file of type png');
          callback(err);
        }
        image.writeFile(fullName + '.png', 'png', function(err) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            console.log('Image converted to png.');
            console.log('Beginning encode process...');
            stego.encode(fullName + '.png', message, function(err, encodeImageName) {
              if(err) {
                console.log('encode png: ', err);
                callback(err);
              } else {
                console.log('encode png: i am now encoded!!!')
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

  decode: function(imageName, callback) {
    var fullName = path.join(paths.temp, imageName);
    var fileBuffer;
    try {
      fileBuffer = readChunk.sync(fullName, 0, 262);
    } catch(e) {
      callback(e);
    }
    var imageType = fileType(fileBuffer);
    // console.log(fullName);
    //Do we need to check file type here??
    // lwip.open(fullName, imageType.ext, function(err, image) {
    //   image.writeFile(fullName + '.png', 'png', function(err) {
    //     if (err) {
    //       console.log(err);
    //       callback(err);
    //     } else {
    //       console.log('Image converted to png.');
    //       console.log('Beginning encode process...');
    //       stego.decode(fullName+'.png', function(err, message) {
    //         if(err) {
    //           console.log(err);
    //           callback(err);
    //         } else {
    //           console.log('Message has been decoded successfully');
    //           callback(null, message);
    //         }
    //       });
    //     }
    //   });
    // });
    if(!imageType) {
      console.log('Error, file is null');
      callback(new Error('File is not valid'));
    } else if (imageType.ext !== 'png') {
      lwip.open(fullName, imageType.ext, function(err, image) {
        var fullName = path.join(paths.temp, path.basename(fullName, imageType.ext) + '.png');
        console.log('fullname is: ', fullname);
        image.writeFile(fullName + '.png', 'png', function(err) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            console.log('Image converted to png.');
            console.log('Beginning decode process...');
            stego.decode(fullName+'.png', function(err, message) {
              if(err) {
                console.log(err);
                callback(err);
              } else {
                console.log('Message has been decoded successfully');
                callback(null, message);
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
            console.log('Beginning decode process...');
            stego.decode(fullName+'.png', function(err, message) {
              if(err) {
                console.log(err);
                callback(err);
              } else {
                console.log('Message has been decoded successfully');
                callback(null, message);
              }
            });
          }
        });
      });
    } else {
      console.log('Cannot recognize the filetype: ', imageType.ext);
      callback(new Error('Filetype is incorrect'));
    }
    // stego.decode(fullName, function(err, message) {
    //   if (err) {
    //     console.log(err);
    //     callback(err);
    //   } else {
    //     console.log('Message has been decoded successfully');
    //     callback(null, message);
    //   }
    // });
  }
};

