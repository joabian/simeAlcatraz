app.controller('IncidenciaController', function ($scope, Services) {

    function getAllInc() {
        var servCall = Services.getAll();
        servCall.then(function (d) {
            $scope.inc = d.data;
            console.log($scope.inc)
        }, function (error) {
            console.log('algo salio mal!')
        })
    };
    
    $scope.makEdit = function (ob) {
        ob.target.setAttribute("contenteditable", true);
        ob.target.focus();
    };

    $scope.updInc = function (inc, eve) {
        inc.descripcion = eve.currentTarget.innerText;
        var upd = Services.updateEquipo(inc);
        upd.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.dltInc = function (id) {
        var dlt = Services.deleteInc(id);
        dlt.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveInc = function () {
        var incidencia = {
            usuario = $scope.usuario,

        }
        
  
        console.log(equipo);
        var saveEquipo = Services.saveEquipo(equipo);
        saveEquipo.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    }
})