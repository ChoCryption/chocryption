var decodeController = require('./decodeController.js');

module.exports = function (app) {

  app.route('/')
    .post(decodeController.decodeMessage);

};
