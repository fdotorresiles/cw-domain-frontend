(function() {
  'use strict';

  angular
    .module('cw')
    .controller('HomeController', HomeController)
    .controller('AddUserController', AddUserController)
    .controller('EditUserController', EditUserController);

  /** @ngInject */
  function HomeController(HomeService,$mdDialog,$scope,$rootScope,$mdToast) {
    var vm = this;   

    function init(){
      vm.loading = true;
      HomeService.getUsers()
        .success(function(data){
          vm.loading = false;
          vm.users = data;
        });
    }
    init();

    $rootScope.$on("triggerAU",function(){
      init();
    });

    vm.addUser = function(ev){
      $mdDialog.show({
        controller: AddUserController,
        templateUrl: 'app/modals/addUser.modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        controllerAs: 'vm',
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }

    vm.deleteUser = function(id){
      HomeService.deleteUser(id)
        .success(function(data){
          $mdToast.show(
            $mdToast.simple()
              .textContent('Se eliminó correctamente')
              .position('bottom','left' )
              .hideDelay(3000)
          );
          init();
        });
    }
    
    vm.editUser = function(ev,user){
      $rootScope.currentUser = user;
      $mdDialog.show({
        controller: EditUserController,
        templateUrl: 'app/modals/editUser.modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        controllerAs: 'vm',
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }

  }

  /* Add user */
  function EditUserController($scope,$mdDialog,HomeService,$rootScope){
    var vm = this;

    vm.user = $rootScope.currentUser;
    
    vm.save = function(user){
      HomeService.updateUser(user)
        .success(function(data){
          $mdDialog.hide();
          $rootScope.$broadcast("triggerAU",{});
      }).error(function(data){
        alert(JSON.stringify(data));
      });
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  /* Edit user */
  function AddUserController($scope,$mdDialog,HomeService,$rootScope){
    var vm = this;

    vm.save = function(user){
      user.stateId = 1;
      HomeService.saveUser(user)
        .success(function(data){
          $mdDialog.hide();
          $rootScope.$broadcast("triggerAU",{});
      }).error(function(data){
        alert(JSON.stringify(data));
      });
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();
