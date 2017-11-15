(function() {
    'use strict';

    angular
        .module('simeAlcatraz')
        .directive('egAppStatus', egAppStatus);

    egAppStatus.$inject = ['appInfo'];
    
    function egAppStatus(appInfo) {     
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: '/Scripts/APIScripts/Photo/egAppStatus.html'
        };
        return directive;

        function link(scope, element, attrs) {     
            scope.status = appInfo.status;
        }
    }

})();