var fs = require('fs');

module.exports = {

  encodeMessage: function (req, res, next) {
  	console.log(req);
  	console.log(req.body);
    //extract the message from the data, and send it into the service that encodes messages

    //expect to get a picture back, and send it in the res

  }

};