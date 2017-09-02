app.controller('AreaTecnicoController', function ($scope, Services,$rootScope) {
    getEquipoInvenPeriodo();

    function getEquipoInvenPeriodo(){
        var servCall = Services.getEquiposStock();
        servCall.then(function (d) {
            $scope.EquipoForInven = d.data;
            // console.log($scope.equipos)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }

})