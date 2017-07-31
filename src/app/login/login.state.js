(function() {
  'use strict';

  angular
    .module('cw')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }
    
})();