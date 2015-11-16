var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var paths = require('../lib/util.js').paths;
var path = require('path');
var upload = multer({
  //destination folder
  dest: paths.temp
});



module.exports = function (app, express) {

  var encodeRouter = express.Router();
  var decodeRouter = express.Router();
  var imageRouter = express.Router();

  //logging middleware
  app.use(morgan('dev'));

  //serve status files
  app.use(express.static(paths.client));

  //route encode requests to the encode router
  app.use('/api/encode', bodyParser.json(), encodeRouter);
  //route decode requests to the decode router
  app.use('/api/decode', upload.single('imageFile'), decodeRouter);

  app.use('/img', imageRouter);

  require('../encode/encodeRouter.js')(encodeRouter);
  require('../decode/decodeRouter.js')(decodeRouter);
  require('../image/imageRouter.js')(imageRouter);
};
