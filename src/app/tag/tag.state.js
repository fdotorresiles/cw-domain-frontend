(function() {
  'use strict';

  angular
    .module('cw')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main.tag', {
        url: 'tags/:id',
        templateUrl: 'app/tag/tag.view.html',
        controller: 'TagController',
        controllerAs: 'vm'
      });
  }

})();