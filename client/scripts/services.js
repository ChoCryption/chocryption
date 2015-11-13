angular.module('cho.services', [])

.factory('Encrypt', function ($http, $window) {

  var encryptMessage = function (message) {

    return $http({
        method: 'POST',
        data: {
          message: message
        },
        url: '/api/encode'
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.log('error: ', err);
      });
  };

  return {
    encryptMessage: encryptMessage
  };


});
