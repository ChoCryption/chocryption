var path = require('path')
var fs = require('fs');

module.exports = {

  findImage: function (req, res, next, code) {

    req.imgCode = code
    console.log(code);
    next();

  },

  sendImage: function (req, res, next) {

  	var image = path.join(__dirname,'/../temp/encoded/',req.imgCode+'.png');
  	console.log(image);

    res.sendFile(image);

  }

};
