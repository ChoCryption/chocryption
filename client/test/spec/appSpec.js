var xhr, requests;

before(function () {
  //fake ajax
  xhr = sinon.useFakeXMLHttpRequest();
  requests = [];
  xhr.onCreate = function (req) {
    requests.push(req);
  };
});

after(function () {
  //cleanup
  xhr.restore();
});

describe('Encrypting a message', function () {

  var api = '/api/encrypt';
  var message = 'Hello World!';

  it('makes a POST request to api endpoint', function () {
    encryptMessage(message, sinon.spy());
    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(api);
  });

  it('writes message to request body', function () {
    encryptMessage(message, sinon.spy());
    expect(requests[0].requestBody).to.equal(message);
  });

  it("calls callback after server response", function () {
    var callback = sinon.spy();
    encryptMessage(message, callback);
    requests[0].respond(
      200, {
        "Content-Type": "application/json"
      }, JSON.stringify({
        img: 'testImage.jpg'
      })
    );
    expect(callback.calledOnce);
  });

});

describe('Decrypting a message', function () {

  var api = '/api/decrypt';

  it('makes a POST request to api endpoint', function () {
    decryptMessage(message, sinon.spy());
    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(api);
  });

  it('writes message to request body', function () {
    decryptMessage(message, sinon.spy());
    expect(requests[0].requestBody).to.equal(message);
  });

  it("calls callback after server response", function () {
    var callback = sinon.spy();
    decryptMessage(message, callback);
    requests[0].respond(
      200, {
        "Content-Type": "application/json"
      }, JSON.stringify({
        img: 'testImage.jpg'
      })
    );
    expect(callback.calledOnce);
  });

});
