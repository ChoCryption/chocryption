var encodeController = require('./encodeController.js');

module.exports = function (app) {

  app.route('/')
    .post(encodeController.encodeMessage);

};
