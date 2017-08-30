(function() {
    'use strict';
    angular
        .module('cw')
        .factory('AuthService', AuthService);

    function AuthService ($http,API) {

        var public_api = {
            login : login,
            getCodes : getCodes,
            sendRecovery:sendRecovery,
            reset:reset,
            getRol:getRol,
            saveRol:saveRol
        }
        return public_api;

        function saveRol(object){
          return $http.post(API.url + '/RoleMappings',object);
        }

        function getRol(id){
          return $http.get(API.url + '/UserCustoms/'+id+'/roles');
        }

        function login(login){
            return $http.post(API.url + '/UserCustoms/login',login);
        }

        function getCodes(){
            return $http.get("app/login/CountryCodes.json");
        }

        function sendRecovery(object){
          return $http({
            method: 'POST',
            url: API.url + '/UserCustoms/reset',
            data: object
          });
        }


        function reset(token,object){
          return $http({
            method: 'PATCH',
            url:API.url + '/UserCustoms/'+object.id,
            data: object,
            headers: {'Authorization': token}
          });
        }


    }
})();
