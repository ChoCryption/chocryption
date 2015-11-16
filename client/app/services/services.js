angular.module('cho.services', [])

.factory('Encrypt', function ($http) {

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
      });
  };

  return {
    encryptMessage: encryptMessage
  };

})


.factory('Decrypt', function ($http) {

  var decryptMessage = function (form) {
    return $http({
        method: 'POST',
        data: form,
        url: '/api/decode',
        /* These two lines below are a workaround to send form data in angular
        Manually setting ‘Content-Type’: multipart/form-data 
        will fail to fill in the boundary parameter of the request
        */
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
      .then(function (response) {
        return response.data;
      });
  };

  return {
    decryptMessage: decryptMessage
  };

});
