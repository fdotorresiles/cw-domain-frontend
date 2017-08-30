(function() {
  'use strict';

  angular
    .module('cw')
    .controller('ResetController', ResetController);

  /** @ngInject */
  function ResetController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,AuthService,$state,$stateParams) {
    var vm = this;

    vm.token = $stateParams.token;
    vm.id = $stateParams.id;

    vm.send = function(){
      var object = {
        id:vm.id,
        password:vm.password
      }
      AuthService.reset(vm.token,object)
        .success(function(){
          vm.password = "";
          vm.repeat = "";
          $mdToast.show(
            $mdToast.simple()
              .textContent('Se cambió la contraseña')
              .position('bottom','right ')
              .hideDelay(3000)
          );
        });
    }

  }
})();
