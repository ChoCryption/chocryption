var app = angular.module('app', [
    'ui.router',
    'cho.services'
  ]);

app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home.html'
    })
    .state('home.encrypt', {
      url: '/encrypt',
      templateUrl: 'pages/encrypt.html',
      controller: 'encryptCtrl'
    })
    .state('home.decrypt', {
      url: '/decrypt',
      templateUrl: 'pages/decrypt.html',
      controller: 'decryptCtrl'
    });

    $urlRouterProvider.otherwise('/home/encrypt');

});

// app.controller('homeCtrl', function($scope) {
//   console.log("hey I'm at home")
// })

// app.controller('decryptCtrl', function($scope) {
//   console.log("hey what's up")
// });

app.controller('encryptCtrl', function($scope, $http, Encrypt) {
  $scope.message = '';

  $scope.encryptMessage = function () {   
    Encrypt.encryptMessage($scope.message)
    .then(function (imageData) {
      console.log(imageData);
      var image = document.createElement('img');
      image.src = imageData;
      document.body.appendChild(image);
      //placeholder for blog stuff
    })
    .catch(function (error) {
      console.error(error);
    });
  };
});

app.controller('decryptCtrl', function($scope, $http) {
  $scope.decryptMessage = function (file, callback) {
    $http({
      method: 'POST',
      data: file,
      url: '/api/decrypt'
    })
    .then(function(resp) { /////// STUBS FOR PROMISES
      console.log('Hey!  You made a successful POST to decryptMessage');
      callback(resp);
    })
    .catch(function(resp) {
      console.log("Hey!  Error on your POST to decryptMessage");    
    });
  };
});
