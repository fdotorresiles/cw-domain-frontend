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
            updateUser : updateUser,
            myprofile : myprofile,
            saveMyProfile : saveMyProfile
        }
        return public_api;

        function saveMyProfile(user){
            return $http({
                method: 'PATCH',
                url: API.url + '/UserCustoms/'+localStorage.getItem('idcw'), 
                data: user,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }
        
        function myprofile(){
            return $http({
                method: 'GET',
                url: API.url + '/UserCustoms/'+localStorage.getItem('idcw'),
                //data: vista,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }
        
        function getUsers(){
            return $http({
                method: 'GET',
                url: API.url + '/UserCustoms',
                //data: vista,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function saveUser(user){
            return $http({
                method: 'POST',
                url: API.url + '/UserCustoms',
                data: user,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function updateUser(user){
            return $http({
                method: 'PATCH',
                url: API.url + '/UserCustoms/'+user.id,
                data: user,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function deleteUser(id){
            return $http({
                method: 'DELETE',
                url: API.url + '/UserCustoms/'+id,
                //data: user,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }
    }
})();
