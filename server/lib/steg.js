var lwip = require('lwip');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

var _index = 0;
var _width = 0;
var _height = 0;
var _clone;
var _batch;
var _password;

/*
Reads the least significant bits of the pixel (Red, Green and Blue) and
add them to the corresponding position of the byte being constructed
*/
var unpackBit = function (b, pixel, position) {

  switch (position % 3) {
    case 0:
      color = 'r';
      break;
    case 1:
      color = 'g';
      break;
    case 2:
      color = 'b';
      break;
  }

  // if pixel is set
  if (pixel[color] & (1 << 0)) {
    b |= 1 << (7 - position);
  }

  return b;

};

/*
Sets the least significant bit to 1 or 0 (depending on the bit to set)
*/
var packBit = function (pixel, position, bit) {

  var color;
  switch (position % 3) {
    case 0:
      color = 'r';
      break;
    case 1:
      color = 'g';
      break;
    case 2:
      color = 'b';
      break;
  }

  if (bit) {
    pixel[color] |= 1 << 0;
  } else {
    pixel[color] &= ~(1 << 0);
  }

  return pixel;

};

/*
Reads the next section (a section ends when the least significant bit of the
blue component of the third pixel is 0)
*/
var digUpNextSection = function () {

  var b;
  var pixel;
  var buffer = [];

  while (_index < _width * _height) {
    b = 0;
    for (var i = 0; i < 8; i++) {
      if (i % 3 == 0) {
        pixel = _clone.getPixel(_index % _width, Math.floor(_index / _width));
        _index++;
      }
      b = unpackBit(b, pixel, i);
    }

    buffer.push(b);
    if (pixel.b & (1 << 0)) {
      break;
    }
  }

  buffer = new Buffer(buffer);

  if (_password) {
    var decipher = crypto.createDecipher('aes-256-ctr', _password);
    buffer = Buffer.concat([decipher.update(buffer), decipher.final()]);
  }

  return buffer;

};

/*
Embeds a buffer of data
*/
var embedSection = function (buffer) {

  var pixel;

  if (_password) {
    var cipher = crypto.createCipher('aes-256-ctr', _password);
    buffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
  }

  var bit;

  // TODO: I have the impression that this algorithm can be simplified...
  for (var i = 0; i < buffer.length; i++) {
    octect = buffer[i];

    for (var j = 0; j < 8; j++) {
      if (j % 3 == 0) {
        if (pixel) {
          _batch.setPixel(_index % _width, Math.floor(_index / _width), pixel);
          _index++;
        }
        pixel = _clone.getPixel(_index % _width, Math.floor(_index / _width));
      }
      if (octect & (1 << (7 - j))) {
        bit = 1;
      } else {
        bit = 0;
      }
      pixel = packBit(pixel, j, bit);

    }

    if (i == (buffer.length - 1)) {
      pixel.b |= 1 << 0;
    } else {
      pixel.b &= ~(1 << 0);
    }

    _batch.setPixel(_index % _width, Math.floor(_index / _width), pixel);
    _index++;
    pixel = undefined;
  }

};

module.exports = {

  decode: function (imageFile, cb) {

    var message = '';
    console.log(imageFile);

    lwip.open(imageFile,
      function (err, image) {
        if (!err) {

          _width = image.width();
          _height = image.height();
          _clone = image;

          var buffer = digUpNextSection();
          var embededShasum = digUpNextSection();
          var bufferShasum = crypto.createHash('sha1');
          bufferShasum.update(buffer);

          if (embededShasum.equals(bufferShasum.digest())) {
            message = buffer.toString();
            cb(null, message);
          } else {
            console.log('Nothing to do here...');
            return;
          }

        } else {
          console.log(err);
          return;
        }
      }
    );

    _index = 0;
    _width = 0;
    _height = 0;
    console.log('Decode Successful');
    return;
  },
  encode: function (imageFile, message, callback) {

    var fileLocation = path.dirname(imageFile);

    var outputFile = path.join(fileLocation,'encoded-' + path.basename(imageFile));

    var embedMessage = function(message, cb) {
      message = new Buffer(message);
      cb(null, message);
    };
    embedMessage(message, function (err, data) {

      if (!err) {
        var shasum = crypto.createHash('sha1');
        shasum.update(data);

        lwip.open(imageFile, function (err, image) {
            if (!err) {

              image.clone(function (err, clone) {

                if (!err) {
                  _clone = clone;
                  _width = clone.width();
                  _height = clone.height();
                  _batch = clone.batch();

                  embedSection(data);
                  embedSection(shasum.digest());

                  outputFile = outputFile ? outputFile : 'output';

                  _batch.writeFile(outputFile, function (err) {
                    if (err) {
                      console.log(err);
                    }
                    console.log('no error');
                    callback(null, outputFile);
                  });
                } else {
                  console.log(err);
                }

              });

            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }

    });
    _index = 0;
    _width = 0;
    _height = 0;
    console.log('finsihed');
    return;
  }
};