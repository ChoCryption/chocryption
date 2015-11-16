angular.module('cho.decrypt', ['cho.services'])

.controller('decryptCtrl', function ($scope, Decrypt) {
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
