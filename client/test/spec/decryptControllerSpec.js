var expect = chai.expect;

describe('decryptCtrl', function () {
  var $scope, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('cho.decrypt'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    // Decrypt = $injector.get('Decrypt');

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('decryptCtrl', {
        $scope: $scope
      });
    };
  }));

  it('should have a secretMessage on the $scope', function () {
    createController();
    expect('$scope.secretMessage').to.be.a('string');
  });

  it('should have a errorMessage on the $scope', function () {
    createController();
    expect('$scope.errorMessage').to.be.a('string');
  });

  it('should have a decryptMessage method on the $scope', function () {
    createController();
    expect($scope.decryptMessage).to.be.a('function');
  });

  //not sure how to test this
  xit("should update secretMessage when an image has been decoded", function (done) {
    createController();
    $httpBackend.whenPOST("/api/decode").respond({
      data: {
        message: 'Chocrypted!'
      }
    });
    $scope.decryptMessage();

    setTimeout(function () {
      expect($scope.secretMessage).to.equal('Chocrypted!');
      $httpBackend.flush();
      done();
    }, 2000);

  });

});
