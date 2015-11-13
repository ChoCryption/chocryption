var expect = require('chai').expect;
var assert = require('assert');
var steg = require('../server/lib/steg.js');
var fs = require('fs');

var testAssetsDir = '../test_assets/';
//temp is for all processed files, should be empty when test not running
var testTempDir = '../test_assets/test_temp/';

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

    //done used for async operations
    it('Should encode a message', function(done) {
      steg.encode('')
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