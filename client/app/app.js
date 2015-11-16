angular.module('app', [
  'ui.router',
  'cho.services',
  'cho.encrypt',
  'cho.decrypt'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home/encrypt');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/shared/home.html'
    })
    .state('home.encrypt', {
      url: '/encrypt',
      templateUrl: 'app/encrypt/encrypt.html',
      controller: 'encryptCtrl'
    })
    .state('home.decrypt', {
      url: '/decrypt',
      templateUrl: 'app/decrypt/decrypt.html',
      controller: 'decryptCtrl'
    });
});
