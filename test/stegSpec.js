/*jshint expr: true*/

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var steg = require('../server/lib/steg.js');
var paths = require('../server/lib/util.js').paths;
var init = require('../server/lib/util.js').initialize;

var testAssetsDir = '../test_assets/';
var testTempDir = '../test_assets/test_temp/';

var testPaths = {
  image: path.join(__dirname, testAssetsDir),
  encoded: path.join(__dirname, testTempDir),
  temp: path.join(__dirname, testTempDir),
};

init(testPaths);

describe('Steganography', function () {

  // beforeEach(function () {

  //   var files = fs.readdirSync(paths.temp);
  //   var filePath = '';
  //   var i = 0;

  //   //Remove all files form temp directory
  //   if ( files.length > 0 )
  //     for ( i = 0; i < files.length; i++ ) {
  //       filePath = paths.temp + files[i];
  //       if ( fs.statSync(filePath).isFile() ) {
  //         fs.unlinkSync( filePath );
  //       } else {
  //         console.log('is not file');
  //       }
  //     }
  // });

  describe('Message Encoding: ', function () {

    var testMessage = 'Testing is Fun for Everyone!!';
    var testImage = '';

    it('Should return a string filename if successful', function ( done ) {
      var unencodedTestImage = path.join( paths.image, '/PNG_Example.png' );

      steg.encode(unencodedTestImage, testMessage, function ( err, fileName ) {
        expect( err ).to.be.null;
        expect( fileName ).to.be.a( 'string' );
        done();
      });
    });

  });

  describe('Message Decoding: ', function () {

    var testMessage = 'Testing is Fun for Everyone!!';
    var testImage = 'PNG_Example';

    // beforeEach(function(){
    //   //Ensure we have a good working encoded image
    // });

    it('Should return a message when image decoded', function ( done ) {
      var encodedTestImage = path.join(paths.image, '/encoded-PNG_Example.png.png');

      steg.decode(encodedTestImage, function ( err, message ) {
        expect( err ).to.be.null;
        expect( message ).to.be.a( 'string' );
        done();
      });
    });
  });
});