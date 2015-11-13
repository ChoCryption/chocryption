angular.module('cho.services', [])

.factory('Encrypt', function ($http, $window, $q) {

	var encryptMessage = function(message) {
		
		// var Promise = $q.defer();

    console.log('about to run post', message);

		return $http({
      method: 'POST',
      data: {message: message},
      url: '/api/encode',
      responseType: 'blob'
    })
    .then(function(data) {
      console.log('starting then', data);

      return $q(function(resolve, reject) {

      	var reader = new $window.FileReader();
      	
      	reader.onloadend = function(a) {
          console.log('onloadend');
          console.log(a);
      		console.log('done reading the data', reader.result);
      		resolve(reader.result);
      	}
        // return data;

      	console.log('about to start data read');
      	reader.readAsDataURL(data.data);

      });

    })
    .catch(function(err) {
      console.log('error: ', err);
    	Promise.reject(err);
    })

    // return Promise.promise;
	};

  return {
    encryptMessage: encryptMessage
  };


});
