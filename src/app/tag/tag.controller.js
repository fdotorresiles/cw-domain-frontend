(function() {
  'use strict';

  angular
    .module('cw')
    .controller('TagController', TagController)
    .controller('AddTagController', AddTagController)
    .controller('EditTagController', EditTagController);

  /** @ngInject */
  function TagController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,DomainService,$stateParams) {
    var vm = this;

    vm.tags = [];
    vm.idDomain = $stateParams.id;

    function init(){
      vm.loading = true;
      DomainService.myTagsDomain(vm.idDomain)
        .success(function(data){
          vm.allTags = data;
          vm.loading = false;
        });
    }
    init();

    $rootScope.$on("triggerAD",function(){
      init();
    });

    vm.removeTag = function(id){
      DomainService.deleteMyTags(vm.idDomain,id)
        .success(function () {
          init();
        });
    }

    vm.addTags = function(){
      var objects = [];
      for(var i = 0; i < vm.tags.length; i++){
        var object = {
          "tag": vm.tags[i],
          "active": true,
          "domainpertagkey": vm.idDomain
        }
        objects.push(object);
      }

      sendTags(objects);
    }

    function sendTags(tags){
      for(var i = 0; i < tags.length;i++){
        DomainService.saveMyTags(vm.idDomain,tags[i]).success(function(){});
        if(i == (tags.length-1)) {
          vm.tags = [];
          init();
        }
      }
    }

    vm.addDomain = function(ev){
      $mdDialog.show({
        controller: AddDomainController,
        templateUrl: 'app/modals/addDomain.modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        controllerAs: 'vm',
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }

    vm.deleteDomain = function(id){
      DomainService.deleteUserDomain(id)
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

    vm.editDomain = function(ev,domain){
      $rootScope.currentDomain = domain;
      $mdDialog.show({
        controller: EditDomainController,
        templateUrl: 'app/modals/editDomain.modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        controllerAs: 'vm',
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }

  }

  /* Edit user */
  function EditTagController($scope,$mdDialog,HomeService,$rootScope,DomainService){
    var vm = this;

    vm.domain = $rootScope.currentDomain;
    vm.domain.periodicity = new Date(vm.domain.periodicity);

    function init(){
      DomainService.getDomains()
        .success(function(data){
            vm.domains = data;
            vm.userDomain = vm.domains[0];
        });
    }

    vm.save = function(){
      DomainService.editUserDomain(vm.domain).success(function(){
        $mdDialog.hide();
        $rootScope.$broadcast("triggerAD",{});
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

  /* Add user */
  function AddTagController($scope,$mdDialog,HomeService,$rootScope,DomainService){
    var vm = this;
    vm.currentDate = new Date();
    vm.notificationType = 1;

    function init(){
      DomainService.getDomains()
        .success(function(data){
            vm.domains = data;
            vm.userDomain = vm.domains[0];
        });
    }
    init();

    vm.save = function(){
      //var periocity = moment(vm.currentDate).format("hh:mm");

      var object = {
        "periodicity": vm.currentDate,
        "notificationType": vm.notificationType,
        "active": true,
        "sendSeedEmail": true,
        "userId": parseInt(localStorage.getItem("idcw")),
        "domainId": vm.userDomain.id
      }
      DomainService.addUserDomain(object).success(function(){
        $rootScope.$broadcast("triggerAD",{})
        $mdDialog.hide();
      });

    }

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();
