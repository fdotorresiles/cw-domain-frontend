(function() {
  'use strict';

  angular
    .module('cw')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main.domain', {
        url: 'domains',
        templateUrl: 'app/domain/domain.view.html',
        controller: 'DomainController',
        controllerAs: 'vm'
      });
  }

})();