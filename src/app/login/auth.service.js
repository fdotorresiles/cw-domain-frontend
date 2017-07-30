(function() {
    'use strict';
    angular
        .module('cw')
        .factory('AuthService', AuthService);

    function AuthService ($http,API) {
        
        var public_api = {
            login : login
        }
        return public_api;

        function login(login){
            return $http.post(API.url + '/UserCustoms/login',login);
        }
    }
})();
