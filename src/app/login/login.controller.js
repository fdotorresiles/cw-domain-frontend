(function() {
  'use strict';

  angular
    .module('cw')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,AuthService,$state) {
    var vm = this;   

    if(localStorage.getItem("tokencw")){
      $state.go("main.home");
    }

    vm.register = function(user){
      user.stateId = 1;
      HomeService.saveUser(user)
        .then(function(data){
          if(data.status == 200){
            AuthService.login({email:user.email,password:user.password}).success(function(data){
              vm.user = null;
              localStorage.setItem("tokencw",data.data.id);
              localStorage.setItem("idcw",data.data.userId);
              $state.go('main.home');
            });
          }
      }).catch(function(data){
      });
    }

    vm.auth = function(login){
      AuthService.login(login).then(function(data){
        if(data.status == 200){
          localStorage.setItem("tokencw",data.data.id);
          localStorage.setItem("idcw",data.data.userId);
          $state.go('main.home');
        }
      });
    }

  }
})();