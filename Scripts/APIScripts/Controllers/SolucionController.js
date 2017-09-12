app.controller('SolucionController', function ($scope, Services) {

    getSol();

    function getSol() {
        var select = Services.getSol();

        select.then(function (d) {
            $scope.sol = d.data;
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.updSolucion = function (solucion, eve) {
        solucion.nombre = eve.currentTarget.innerText;

        var upd = Services.updateSol(solucion);

        upd.then(function (d) {
            getSol();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.dltSolucion = function (id) {
        var dlt = Services.deleteSol(id);
        dlt.then(function (d) {
            getSol();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };
    function getIncidencias() {
        var selInc = Services.getIncidencias();
        selInc.then(function (d) {
            $rootScope.incidencias = d.data;
            //console.log($rootScope.incidencias);

        }, function (error) {
            console.log('algo salio mal!')
        })
    }

    $scope.saveSolucion = function (ob) {
        var id = ob.currentTarget.value;
        var sol = $scope.solucion;
        var usuario = $scope.usuario;
        //alert(id + sol + usuario);
        var solucion = {
            incidenciaID: id,
            solucion: sol,
            funciono: true,
            contador: 1,
            usuario: usuario
        };

        var save = Services.saveSol(solucion);

        save.then(function (d) {
            Services.updateIncidenciaField(id, "status", "4");
            
            getIncidencias();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    }

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };

})