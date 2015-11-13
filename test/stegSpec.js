var expect = require('chai').expect;
var assert = require('assert');
var steg = require('../server/lib/steg.js');
var fs = require('fs');

var testAssetsDir = './test_assets/';
//temp is for all processed files, should be empty when test not running
var testTempDir = './test_assets/test_temp/';

describe('Steganography', function () {

  beforeEach(function() {
    //image stuff
  });

  describe('Message Encoding: ', function() {
    var testMessage = 'Testing is Fun for Everyone!!';
    var testImage = '';

    beforeEach(function(){
      //
    });

    it('Should provide an error if file does not exist', function(){

      var unencodedTestImage = path.join(testAssetsDir, '/doesnotexist');

      steg.encode(unencodedTestImage, testMessage, function(err, fileName) {
        expect(fileName).to.not.exist;
        expect(err).to.exist;
      });
    });

    //done used for async operations
    it('Should encode a message without an error', function(done) {
      var unencodedTestImage = path.join(testAssetsDir, '/PNG_Example');
      steg.encode(unencodedTestImage, testMessage, done);
    });

    it('Should return a string filename if successful', function(done) {
      var unencodedTestImage = path.join(testAssetsDir, '/PNG_Example');
      steg.encode(unencodedTestImage, testMessage, function(err, fileName) {
        expect(err).to.not.exist;
        expect(fileName).to.exist;
        expect(fileName).to.be.a('string');
      });
    });

  });
});

describe('/', function () {
  it('should return 200', function(done) {
    http.get('http://localhost:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();    
    });  
  });
});