var app = angular.module('app', ['ui.router']);

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

app.controller('encryptCtrl', function($scope, $http) {
  $scope.encryptMessage = function (message, callback) {   
    $http({
      method: 'POST',
      data: message,
      url: '/api/encrypt' 
      })
    .success(function(resp) { /////// STUBS FOR PROMISES
      console.log('Hey!  You made a successful POST to encryptMessage'); 
      callback(resp);
    })
    .error(function(resp) {
      console.log("Hey!  Error on your POST to encryptMessage");
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
    .success(function(resp) { /////// STUBS FOR PROMISES
      console.log('Hey!  You made a successful POST to decryptMessage');
      callback(resp);
    })
    .error(function(resp) {
      console.log("Hey!  Error on your POST to decryptMessage");    
    });
  };
});
