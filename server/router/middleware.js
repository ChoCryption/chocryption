var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({
  //destination folder
  dest: __dirname+'/../uploads'
});



module.exports = function (app, express) {
 
  var encodeRouter = express.Router();
  var decodeRouter = express.Router();

  //logging middleware
  app.use(morgan('dev'));

  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({extended: true}));
  // app.use(bodyParser.json());

  //serve status files
  app.use(express.static(path.resolve(__dirname + '/../client')));

  //route encode requests to the encode router
  app.use('/api/encode', bodyParser.urlencoded({extended: true}), encodeRouter);
  //route decode requests to the decode router
  app.use('/api/decode', upload.single('imageFile'), decodeRouter);

  require('../encode/encodeRouter.js')(encodeRouter);
  require('../decode/decodeRouter.js')(decodeRouter);
};