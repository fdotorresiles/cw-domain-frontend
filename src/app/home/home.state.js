(function() {
  'use strict';

  angular
    .module('cw')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main.home', {
        url: 'home',
        templateUrl: 'app/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }

})();