(function () {
    'use strict';

    angular
        .module('app.photo')
        .factory('photoManagerClient', photoManagerClient);

    photoManagerClient.$inject = ['$resource'];
    // - /Scripts/APIScripts/Photo/photo/
    // api/photo/:fileName
    function photoManagerClient($resource) {
        return $resource("/api/photo/:fileName",
                { id: "@fileName" },
                {
                    'query': {method:'GET'},
                    'save': { method: 'POST', transformRequest: angular.identity, headers: { 'Content-Type': undefined } },
                    'remove':{method: 'DELETE', url: '/api/photo/:fileName', params:{name:'@fileName'}}
                });
    }
})();