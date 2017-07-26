(function() {
    'use strict';
    angular
        .module('cw')
        .factory('HomeService', HomeService);

    function HomeService ($http,API) {
        
        var public_api = {
            getUsers : getUsers,
            saveUser : saveUser,
            deleteUser : deleteUser,
            updateUser : updateUser
        }
        return public_api;

        function getUsers(){
            return $http.get(API.url + '/UserCustoms');
        }

        function saveUser(user){
            return $http.post(API.url + '/UserCustoms',user);
        }

        function updateUser(user){
            return $http.patch(API.url + '/UserCustoms/'+user.id,user);
        }

        function deleteUser(id){
            return $http.delete(API.url + '/UserCustoms/'+id);
        }
    }
})();
