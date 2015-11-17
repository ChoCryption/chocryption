/*jshint expr: true*/

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var fileType = require('file-type');
var messageProcess = require('../server/messageProcessing.js');
var paths = require('../server/lib/util.js').paths;
var init = require('../server/lib/util.js').initialize;

var testAssetsDir = '../test_assets/';
var testTempDir = '../test_assets/test_temp/';

testPaths = {
  image: path.join(__dirname, testTempDir),
  encoded: path.join(__dirname, testTempDir),
  temp: path.join(__dirname, testTempDir),
};

init(testPaths);

describe('Message Processing for Steganography', function () {
  this.timeout(5000);

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

    it('Should error if file is not an image', function (done){
      var notAnImageFile = 'goodbye.html';
      messageProcess.encode(notAnImageFile, testMessage, function(err, fileName) {
        if(err) {
          expect(err).to.exist;
          done();
        }
      });
    });

    it('Should handle an image without an extension', function ( done ) {
      var unencodedTestImage = '/PNG_Example';
      messageProcess.encode(unencodedTestImage, testMessage, done);
      var fileExists = fs.statSync(path.join(paths.image + '/PNG_Example.png')).isFile();
      expect(fileExists).to.be.true;

    });

    describe('File type conversion: ', function () {

      it('Should convert a JPG image', function (done) {
        var unencodedTestImage =  'cho.jpg';
        messageProcess.encode(unencodedTestImage, testMessage, function(err, fileName){
          if (err) {
            done(err);
          }
        });
        var fileExists = fs.statSync(path.join(paths.image + 'cho.png')).isFile();
        expect(fileExists).to.be.true;
        done();
      });

    });

    it('Should return a string filename if successful', function ( done ) {
      var unencodedTestImage = '/PNG_Example' ;
      console.log('the path is: ', unencodedTestImage);
      messageProcess.encode(unencodedTestImage, testMessage, function ( err, fileName ) {
        expect( err ).to.be.null;
        expect( fileName ).to.be.a( 'string' );
        done();
      });
    });

  });

  describe('Message Decoding: ', function () {

    var testImage = 'encoded-PNG_Example.png.png';

    it('Should provide an error if file does not exist', function (){
      var fileDoesNotExist = path.join(testAssetsDir, '/doesnotexist');

      messageProcess.decode(fileDoesNotExist, function(err, message) {
        expect(message).to.not.exist;
        expect(err).to.not.be.null;
      });
    });

    it('Should return a message when image decoded', function ( done ) {
      var encodedTestImage = '/encoded-PNG_Example.png.png';

      messageProcess.decode(encodedTestImage, function ( err, message ) {
        expect( err ).to.be.null;
        expect( message ).to.be.a( 'string' );
        done();
      });
    });
  });
});