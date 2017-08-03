(function() {
  'use strict';

  angular
    .module('cw')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,AuthService,$state) {
    var vm = this;
    vm.loading = false;
    vm.btn_login = false;
    vm.btn_register = false;
    if(localStorage.getItem("tokencw")){
      $state.go("main.domain");
    }

    vm.register = function(user){
      vm.loading = true;
      vm.btn_register = true;
      user.stateId = 1;
      HomeService.saveUser(user)
        .then(function(data){
          if(data.status == 200){
            AuthService.login({email:user.email,password:user.password}).success(function(data){
              vm.user = null;
              localStorage.setItem("tokencw",data.id);
              localStorage.setItem("idcw",data.userId);
              vm.loading = false;
              vm.btn_register = false;
              $state.go('main.domain');
            });
          }
      }).catch(function(data){
        vm.loading = false;
        vm.btn_register = false;
      });
    }

    vm.auth = function(login){
      vm.loading = true;
      vm.btn_login = true;
      AuthService.login(login).then(function(data){
        if(data.status == 200){
          localStorage.setItem("tokencw",data.data.id);
          localStorage.setItem("idcw",data.data.userId);
          vm.loading = false;
          vm.btn_login = false;
          //$state.go('main.domain');
        }
      }).catch(function () {
        vm.loading = false;
        vm.btn_login = false;
      });
    }

  }
})();
