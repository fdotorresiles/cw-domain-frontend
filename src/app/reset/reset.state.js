(function() {
  'use strict';

  angular
    .module('cw')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('reset', {
        url: '/reset/:token/:id',
        templateUrl: 'app/reset/reset.view.html',
        controller: 'ResetController',
        controllerAs: 'vm'
      });
  }

})();
