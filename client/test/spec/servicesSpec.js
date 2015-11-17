var expect = chai.expect;

describe("Encrypt Service", function () {
  var Encrypt, httpBackend;

  beforeEach(module('cho.services'));

  beforeEach(inject(function (_Encrypt_, $httpBackend) {
    Encrypt = _Encrypt_;
    httpBackend = $httpBackend;
  }));

  it("should encrypt a message into an image", function () {
    httpBackend.whenPOST("/api/encode").respond({
      data: {
        image: 'cho.png'
      }
    });
    Encrypt.encryptMessage('Secret message')
      .then(function (response) {
        expect(response.data).to.deep.equal({
          image: 'cho.png'
        });
      });
    httpBackend.flush();
  });

});

describe("Decrypt Service", function () {
  var Decrypt, httpBackend;

  beforeEach(module('cho.services'));

  beforeEach(inject(function (_Decrypt_, $httpBackend) {
    Decrypt = _Decrypt_;
    httpBackend = $httpBackend;
  }));

  it("should decrypt an image into a message", function () {
    httpBackend.whenPOST("/api/decode").respond({
      data: {
        message: 'Chocrypted!'
      }
    });
    Decrypt.decryptMessage('Secret message')
      .then(function (response) {
        expect(response.data).to.deep.equal({
          message: 'Chocrypted!'
        });
      });
    httpBackend.flush();
  });

});
