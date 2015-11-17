angular.module('cho.decrypt', ['cho.services'])

.controller('decryptCtrl', function ($scope, Decrypt) {
  $scope.secretMessage = '';
  $scope.errorMessage = '';

  var getFile = function () {
    //pull the first file from the submit form
    var fileSelect = document.getElementById('file-select');
    var file = fileSelect.files[0];
    return file;
  };

  var getFormObject = function (file) {
    //must re-construct a form object for the server to recieve
    var formData = new FormData();
    //name the file with the identifier the server is expecting
    formData.append('imageFile', file);
    return formData;
  };

  $scope.decryptMessage = function () {
    var file = getFile();
    var form = getFormObject(file);

    Decrypt.decryptMessage(form)
      .then(function (message) {
        $scope.secretMessage = message;
      })
      .catch(function (error) {
        //TODO: test this
        $scope.errorMessage = error.message;
      });
  };
});
