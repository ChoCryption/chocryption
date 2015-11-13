var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({
  //destination folder
  dest: __dirname+'/../temp'
});



module.exports = function (app, express) {
 
  var encodeRouter = express.Router();
  var decodeRouter = express.Router();
  var imageRouter = express.Router();

  //logging middleware
  app.use(morgan('dev'));

  //serve status files
  app.use(express.static(__dirname + '/../../client'));

  //route encode requests to the encode router
  app.use('/api/encode', bodyParser.json(), encodeRouter);
  //route decode requests to the decode router
  app.use('/api/decode', upload.single('imageFile'), decodeRouter);

  app.use('/img', imageRouter);

  require('../encode/encodeRouter.js')(encodeRouter);
  require('../decode/decodeRouter.js')(decodeRouter);
  require('../image/imageRouter.js')(imageRouter);
};