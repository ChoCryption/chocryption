/*jshint expr: true*/

var expect = require('chai').expect;
var assert = require('assert');
var messageProcess = require('./../server/messageProcessing.js');
var fs = require('fs');
var fileType = require('file-type');
var paths = require('./lib/util.js').paths;

var testAssetsDir = './test_assets/';
//temp is for all processed files, should be empty when test not running
var testTempDir = './test_assets/test_temp/';

describe('Message Processing for Steganography', function () {

  beforeEach(function () {

    var files = fs.readdirSync(testTempDir);
    var filePath = '';
    var i = 0;

    //Remove all files form temp directory
    if ( files.length > 0 )
      for ( i = 0; i < files.length; i++ ) {
        filePath = testTempDir + '/' + files[i];
        if ( fs.statSync(filePath).isFile() ) {
          fs.unlinkSync( filePath );
        } else {
          console.log('is not file');
        }
      }
  });

  describe('Message Encoding: ', function () {

    var testMessage = 'Testing is Fun for Everyone!!';
    var testImage = '';

    // beforeEach(function(){
    //   //
    // });

    it('Should error if file is not an image', function (){
      var notAnImageFile = path.join(testAssetsDir, '/goodbye.html');

      messageProcess.encode(notAnImageFile, testMessage, function(err, fileName) {
        expect(fileName).to.not.exist;
        expect(err).to.exist;
        expect(err).to.not.be.null;
      });
    });

    it('Should handle an image without an extension', function ( done ) {
      var unencodedTestImage = path.join(testAssetsDir, '/PNG_Example');
      messageProcess.encode(unencodedTestImage, testMessage, done);
      var fileExists = fs.stat(testTempDir + '/PNG_Example.png').isFile();
      expect(fileExists).to.be.true;

    });

    describe('File type conversion: ', function () {

      it('Should convert a JPG image', function (done) {
        //in progress here
        var unencodedTestImage = path.join(testAssetsDir, 'cho.jpg');
        messageProcess.encode(unencodedTestImage, testMessage, done);
        var fileExists = fs.stat(testTempDir + '/cho.png').isFile();
        expect(fileExists).to.be.true;
      });

      it('Should convert to a valid png', function(done) {

      });

    });

    it('Should return a string filename if successful', function ( done ) {
      var unencodedTestImage = path.join( testAssetsDir, '/PNG_Example' );

      messageProcess.encode(unencodedTestImage, testMessage, function ( err, fileName ) {
        expect( err ).to.be.null;
        expect( fileName ).to.exist;
        expect( fileName ).to.be.a( 'string' );
      });
    });

  });

  describe('Message Decoding: ', function () {

    var testImage = 'encoded-PNG_Example.png.png';

    it('Should provide an error if file does not exist', function (){
      var fileDoesNotExist = path.join(testAssetsDir, '/doesnotexist');

      messageProcess.decode(fileDoesNotExist, function(err, message) {
        expect(messaage).to.not.exist;
        expect(err).to.exist;
        expect(err).to.not.be.null;
      });
    });

    it('Should decode a message without an error', function ( done ) {
      var encodedTestImage = path.join(testAssetsDir, '/encoded-PNG_Example.png.png');
      messageProcess.decode(encodedTestImage, done);

    });

    it('Should return a message when image decoded', function ( done ) {
      var encodedTestImage = path.join(testAssetsDir, '/encoded-PNG_Example.png.png');

      messageProcess.decode(encodedTestImage, function ( err, message ) {
        expect( err ).to.be.null;
        expect( fileName ).to.exist;
        expect( fileName ).to.be.a( 'string' );
        console.log('The message is: ', message);
      });
    });
  });
});