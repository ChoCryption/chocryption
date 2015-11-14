var path = require('path');

exports.paths = {
  image: path.join(__dirname, '../image/'),
  encoded: path.join(__dirname, '../temp/encoded/'),
  temp: path.join(__dirname, '../temp/'),
  client: path.join(__dirname, '../../client/')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};