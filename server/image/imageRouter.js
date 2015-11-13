var imageController = require('./imageController.js');

module.exports = function (app) {

	app.param('code', imageController.findImage);

  app.get('/:code', imageController.sendImage);

};
