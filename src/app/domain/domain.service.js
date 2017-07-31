(function() {
    'use strict';
    angular
        .module('cw')
        .factory('DomainService', DomainService);

    function DomainService ($http,API) {
        
        var public_api = {
            getDomains : getDomains,
            addUserDomain : addUserDomain,
            getUserDomain : getUserDomain,
            editUserDomain : editUserDomain,
            deleteUserDomain : deleteUserDomain
        }
        return public_api;

        function getDomains(){
            return $http({
                method: 'GET',
                url: API.url + '/Domains',
                //data: vista,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function addUserDomain(domain){
            return $http({
                method: 'POST',
                url: API.url + '/UserCustoms/'+domain.userId+'/domainperUsers',
                data: domain,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function getUserDomain(){
            return $http({
                method: 'GET',
                url: API.url + '/UserCustoms/'+localStorage.getItem('idcw')+'/domainperUsers',
                //data: domain,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function editUserDomain(domain){
            return $http({
                method: 'PUT',
                url: API.url + '/UserCustoms/'+localStorage.getItem('idcw')+'/domainperUsers/'+domain.id,
                data: domain,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }

        function deleteUserDomain(id){
            return $http({
                method: 'DELETE',
                url: API.url + '/UserCustoms/'+localStorage.getItem('idcw')+'/domainperUsers/'+id,
                //data: domain,
                headers: {'Authorization': localStorage.getItem('tokencw')}
            });
        }
    }
})();
