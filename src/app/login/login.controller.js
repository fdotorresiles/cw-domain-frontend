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

    function init(){
      AuthService.getCodes()
        .success(function(data){
          vm.codes = data;
        });
    }
    init();

    vm.register = function(user){
      vm.loading = true;
      vm.btn_register = true;
      user.stateId = 1;
      user.telephone = vm.code+user.telephone;
      HomeService.saveUser(user)
        .then(function(data){
          if(data.status == 200){
            AuthService.login({email:user.email,password:user.password}).success(function(data){
              vm.user = null;
              localStorage.setItem("tokencw",data.id);
              localStorage.setItem("idcw",data.userId);
              AuthService.getRol(data.userId)
                .success(function(result){
                  localStorage.setItem("rol",result[0].name);
                  vm.loading = false;
                  vm.btn_register = false;
                  $state.go('main.domain');
                });
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
        localStorage.setItem("tokencw",data.data.id);
        localStorage.setItem("idcw",data.data.userId);
        if(data.status == 200){
          AuthService.getRol(data.data.userId)
            .success(function(result){
              console.log(result);
              localStorage.setItem("rol",result[0].name);
              vm.loading = false;
              vm.btn_login = false;
              $state.go('main.domain');
            });
        }
      }).catch(function () {
        vm.loading = false;
        vm.btn_login = false;
      });
    }


    vm.send_recovery = function(email){
      vm.loading = true;
      var object = {
        email:email
      }

      AuthService.sendRecovery(object)
        .then(function(data){
          vm.loading = false;
          vm.reset.email = "";
          $mdToast.show(
            $mdToast.simple()
              .textContent('Se envió el correo de confirmación')
              .position('bottom','right ')
              .hideDelay(3000)
          );
        }).catch(function(e){
          vm.loading = false;
          $mdToast.show(
            $mdToast.simple()
              .textContent('Correo invalido')
              .position('bottom','right ')
              .hideDelay(3000)
          );
      });

    }

  }
})();
