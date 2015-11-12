var morgan = require('morgan');
var path = require('path');


module.exports = function (app, express) {
 
  var encodeRouter = express.Router();
  var decodeRouter = express.Router();

  //logging middleware
  app.use(morgan('dev'));

  //serve status files
  // app.use(express.static(path.resolve(__dirname + '/../client')));
  app.use(express.static(path.resolve(__dirname + '/../client/pages/')))

  //route encode requests to the encode router
  app.use('/api/encode', encodeRouter);
  //route decode requests to the decode router
  app.use('/api/decode', decodeRouter);

  require('../encode/encodeRoutes.js')(encodeRouter);
  require('../decode/decodeRoutes.js')(decodeRouter);
};