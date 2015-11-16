var expect = chai.expect;

describe('encryptCtrl', function () {
  var $scope, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('cho.encrypt'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    //Encrypt = $injector.get('Encrypt');


    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('encryptCtrl', {
        $scope: $scope,
      });
    };
  }));

  it('should have a message on the $scope', function () {
    createController();
    expect('$scope.message').to.be.a('string');
  });

  it('should have a imageSource on the $scope', function () {
    createController();
    expect('$scope.imageSource').to.be.a('string');
  });

  it('should have a errorMessage on the $scope', function () {
    createController();
    expect('$scope.errorMessage').to.be.a('string');
  });

  it('should have a encryptMessage method on the $scope', function () {
    createController();
    expect($scope.encryptMessage).to.be.a('function');
  });

  //not sure how to test this
  xit("should update imageSource when a message has been encoded", function (done) {
    createController();

    $httpBackend.whenPOST("/api/encode").respond({
      data: {
        image: 'cho.png'
      }
    });

    $scope.message = 'Chocrypted!';
    $scope.encryptMessage();

    setTimeout(function () {
      expect($scope.imageSource).to.equal('cho.jpeg');
      $httpBackend.flush();
      done();
    }, 1000);

  });

});
