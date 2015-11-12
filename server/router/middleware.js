var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');


module.exports = function (app, express) {
 
  var encodeRouter = express.Router();
  var decodeRouter = express.Router();

  //logging middleware
  app.use(morgan('dev'));

  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({extended: true}));
  // app.use(bodyParser.json());

  //serve status files
  app.use(express.static(__dirname + '/../../client'));

  //route encode requests to the encode router
  app.use('/api/encode', encodeRouter);
  //route decode requests to the decode router
  app.use('/api/decode', decodeRouter);

  require('../encode/encodeRouter.js')(encodeRouter);
  require('../decode/decodeRouter.js')(decodeRouter);
};