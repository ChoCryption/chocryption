var app = angular.module('app', [
  'ui.router',
  'cho.services'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
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

app.controller('encryptCtrl', function ($scope, $http, Encrypt) {
  $scope.message = '';
  $scope.imageSource = '';

  $scope.encryptMessage = function () {
    Encrypt.encryptMessage($scope.message)
      .then(function (data) {
        console.log(data.image);
        $scope.imageSource = data.image;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

app.controller('decryptCtrl', function ($scope, $http) {
  $scope.secretMessage = '';
  $scope.decryptMessage = function () {

    var fileSelect = document.getElementById('file-select');
    var file = fileSelect.files[0];

    var formData = new FormData();
    formData.append('imageFile', file);

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status === 200) {
        $scope.secretMessage = xhr.responseText;
        console.log('successful');
        $scope.$apply();
      } else {
        console.log('nope');
      }
    };

    xhr.open('POST', '/api/decode', true);

    xhr.send(formData);

  };
});
