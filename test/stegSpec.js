/*jshint expr: true*/

var expect = require('chai').expect;
var assert = require('assert');
var steg = require('../server/lib/steg.js');
var fs = require('fs');

var testAssetsDir = './test_assets/';
//temp is for all processed files, should be empty when test not running
var testTempDir = './test_assets/test_temp/';

describe('Steganography', function () {

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

    it('Should provide an error if file does not exist', function (){
      var unencodedTestImage = path.join(testAssetsDir, '/doesnotexist');

      steg.encode(unencodedTestImage, testMessage, function(err, fileName) {
        expect(fileName).to.not.exist;
        expect(err).to.exist;
        expect(err).to.not.be.null;
      });
    });

    it('Should encode a message without an error', function ( done ) {
      var unencodedTestImage = path.join(testAssetsDir, '/PNG_Example');
      steg.encode(unencodedTestImage, testMessage, done);

    });

    it('Should return a string filename if successful', function ( done ) {
      var unencodedTestImage = path.join( testAssetsDir, '/PNG_Example' );

      steg.encode(unencodedTestImage, testMessage, function ( err, fileName ) {
        expect( err ).to.be.null;
        expect( fileName ).to.exist;
        expect( fileName ).to.be.a( 'string' );
      });
    });

  });

  describe('Message Decoding: ', function () {

    var testMessage = 'Testing is Fun for Everyone!!';
    var testImage = 'PNG_Example';

    beforeEach(function(){
      //Ensure we have a good working encoded image
    });

    it('Should provide an error if file does not exist', function (){
      var unencodedTestImage = path.join(testAssetsDir, '/doesnotexist');

      steg.decode(unencodedTestImage, function(err, message) {
        expect(messaage).to.not.exist;
        expect(err).to.exist;
        expect(err).to.not.be.null;
      });
    });

    it('Should decode a message without an error', function ( done ) {
      var encodedTestImage = path.join(testAssetsDir, '/encoded-PNG_Example.png.png');
      steg.decode(encodedTestImage, done);

    });

    it('Should return a message when image decoded', function ( done ) {
      var encodedTestImage = path.join(testAssetsDir, '/encoded-PNG_Example.png.png');

      steg.decode(encodedTestImage, function ( err, message ) {
        expect( err ).to.be.null;
        expect( fileName ).to.exist;
        expect( fileName ).to.be.a( 'string' );
        console.log('The message is: ', message);
      });
    });
  });
});