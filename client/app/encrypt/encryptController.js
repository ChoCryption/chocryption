angular.module('cho.encrypt', ['cho.services'])

.controller('encryptCtrl', function ($scope, Encrypt) {
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
