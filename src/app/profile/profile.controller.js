(function() {
    'use strict';
  
    angular
      .module('cw')
      .controller('ProfileController', ProfileController);
  
    /** @ngInject */
    function ProfileController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,DomainService,$state) {
      var vm = this;
      vm.edit = true;
      vm.edit_button = true;
      vm.save_button = false;
  
      function init(){
        vm.loading = true;
        HomeService.myprofile()
          .success(function(data){
            vm.loading = false;
            vm.user = data;
          });
      }
      init();
  
      $rootScope.$on("triggerAD",function(){
        init();
      });

      vm.save_input = function(){
        HomeService.saveMyProfile(vm.user)
          .success(function(){
            init();
            vm.edit = true;
            vm.edit_button = true;
            vm.save_button = false;
          });
      }
  
      
      vm.edit_input = function(){
        vm.edit = false;
        vm.edit_button = false;
        vm.save_button = true;
      }

      vm.cancel = function(){
        vm.edit = true;
        vm.edit_button = true;
        vm.save_button = false;
      }
  
    }

  })();
  