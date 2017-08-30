(function() {
  'use strict';

  angular
    .module('cw')
    .controller('DomainController', DomainController)
    .controller('AddDomainController', AddDomainController)
    .controller('EditDomainController', EditDomainController);

  /** @ngInject */
  function DomainController(HomeService,$mdDialog,$scope,$rootScope,$mdToast,DomainService,$state) {
    var vm = this;

    function init(){
      vm.loading = true;
      DomainService.getUserDomain()
        .success(function(data){
          for(var i = 0; i < data.length; i++){
            data[i].periodicity = new Date(data[i].periodicity);
          }
          vm.mydomains = data;
          vm.loading = false;
        }).error(function(e){
          vm.loading = false;
        });
    }
    init();

    $rootScope.$on("triggerAD",function(){
      init();
    });

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

    vm.goTags = function(pid){
      $state.go('main.tag',{id:pid});
    }

  }

  /* Edit user */
  function EditDomainController($scope,$mdDialog,HomeService,$rootScope,DomainService,$q,$timeout){
    var vm = this;

    vm.domain = $rootScope.currentDomain;
    vm.domain.periodicity = new Date(vm.domain.periodicity);
    vm.autoComplete = true;
    vm.simulateQuery = true;
    vm.isDisabled    = false;

    vm.querySearch = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;


    function querySearch (query) {
      var results = query ? vm.domains.filter( createFilterFor(query) ) : vm.domains,deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve( results );
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }

    function searchTextChange(text) {}
    function selectedItemChange(item) {}

    function init(){
      DomainService.getDomains()
        .success(function(data){
          for(var i = 0 ; i < data.length;i ++){
            data[i].value = data[i].name.toLowerCase();
          }
          vm.domains = data;
          DomainService.domainById(vm.domain.domainId)
            .success(function(data){
              vm.autoComplete = false;
              vm.selectedItem = data;
            });
        });


    }
    init();

    vm.save = function(){
      vm.domain.domainId = vm.selectedItem.id;
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
  function AddDomainController($scope,$mdDialog,HomeService,$rootScope,DomainService,$q,$timeout){
    var vm = this;
    vm.currentDate = new Date();
    vm.notificationType = 1;

    vm.simulateQuery = true;
    vm.isDisabled    = false;

    vm.querySearch = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;


    function querySearch (query) {
      var results = query ? vm.domains.filter( createFilterFor(query) ) : vm.domains,deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve( results );
          }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }

    function searchTextChange(text) {}
    function selectedItemChange(item) {}


    function init(){
      DomainService.getDomains()
        .success(function(data){
          for(var i = 0 ; i < data.length;i ++){
            data[i].value = data[i].name.toLowerCase();
          }
          vm.domains = data;
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
        "domainId": vm.selectedItem.id
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
