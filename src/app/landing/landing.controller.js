(function() {
  'use strict';

  angular
    .module('cw')
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,AuthService,$state) {
    var vm = this;
    if(localStorage.getItem("tokencw")){
      $state.go("main.domain");
    }
    vm.login = function(){
      $state.go("login");
    }




  }
})();
