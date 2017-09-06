app.controller('SucursalController', function ($scope, Services) {
    getSucursales();

    function getSucursales() {
        var selSuc = Services.getSucursales();
        selSuc.then(function (d) {
            $scope.sucursales = d.data;

        }, function (error) {
            console.log('algo salio mal!')
        })
    };
    
    $scope.updateSucursal = function (sucursal, eve) {
        sucursal.encargado = eve.currentTarget.innerText;  
        var upd = Services.updateSucursal(sucursal);
        upd.then(function (d) {
            getSucursales();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    }; 

    $scope.deleteSucursal = function (id) {
        var dlt = Services.deleteSucursal(id);
        dlt.then(function (d) {
            getSucursales();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveSucursal = function () {
        var sucursal = {
            usuario: $scope.usuario,
            equipoID: $scope.equipoID,
            descripcion: $scope.descripcion,
            status: 1,
        };

        var saveSucursal = Services.saveSucursal(sucursal);
        saveSucursal.then(function (d) {
            getSucursales();

        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })
    }
    $scope.makEdit = function (ob) {
        ob.target.setAttribute("contenteditable", true);
        ob.target.focus();
    };
})