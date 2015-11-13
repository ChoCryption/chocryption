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

app.controller('encryptCtrl', function ($scope, Encrypt) {
  $scope.message = '';
  $scope.imageSource = '';
  $scope.errorMessage = '';

  $scope.encryptMessage = function () {
    Encrypt.encryptMessage($scope.message)
      .then(function (data) {
        $scope.imageSource = data.image;
      })
      .catch(function (error) {
        //TODO: test this
        $scope.errorMessage = error.message;
      });
  };
});

app.controller('decryptCtrl', function ($scope, Decrypt) {
  $scope.secretMessage = '';
  $scope.errorMessage = '';

  $scope.decryptMessage = function () {

    //pull the first file from the submit form
    var fileSelect = document.getElementById('file-select');
    var file = fileSelect.files[0];
    //must re-construct a form object for the server
    var formData = new FormData();
    //name the file so the server can find it
    formData.append('imageFile', file);

    Decrypt.decryptMessage(formData)
      .then(function (message) {
        $scope.secretMessage = message;
      })
      .catch(function (error) {
        //TODO: test this
        $scope.errorMessage = error.message;
      });
  };
});
