app.controller('SuspencionController', function ($scope, Services) {

    getSusp();

    function getSusp() {
        var select = Services.getSusp();

        select.then(function (d) {
            $scope.susp = d.data;
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.updCategoria = function (suspencion, eve) {
        suspencion.nombre = eve.currentTarget.innerText;

        var upd = Services.updateSusp(suspencion);

        upd.then(function (d) {
            getSusp();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.dltSuspencion = function (id) {
        var dlt = Services.deleteSusp(id);
        dlt.then(function (d) {
            getSusp();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveSuspencion = function (ob) {
        var id = ob.currentTarget.value;
        var comen = $scope.comentario;
        var suspencion = {
            incidenciaID: id,
            comentario: comen,
            activa: true
        };

        var save = Services.saveSusp(suspencion);

        save.then(function (d) {
            Services.updateIncidenciaField(id,"status","2");
            getSusp();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };

})