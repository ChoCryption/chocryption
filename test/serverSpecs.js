var expect = require('chai').expect;
var assert = require('assert');
var http = require('http');
var server = require('../server/server.js')

// listen to server and then stop listening
describe('server', function () {
  before(function () {
    server.listen(8000);
  });
  after(function () {
    server.close();
  });
});

// GET request for going to home page
describe('/', function () {
  it('should return 200', function(done) {
    http.get('http://localhost:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();    
    });  
  });
});

