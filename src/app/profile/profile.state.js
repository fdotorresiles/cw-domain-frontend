(function() {
    'use strict';
  
    angular
      .module('cw')
      .config(routerConfig);
  
    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('main.profile', {
          url: 'profile',
          templateUrl: 'app/profile/profile.view.html',
          controller: 'ProfileController',
          controllerAs: 'vm'
        });
    }
  
  })();