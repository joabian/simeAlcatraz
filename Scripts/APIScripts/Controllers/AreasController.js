app.controller('AreasController', function ($scope, Services) {
    getAreas();
    getEncargado();
    getSucursales();
    getEquipoSinArea();
    //getAreaBySucId();

    function showNotification(tipo, msg, title, TimeOut) {
        toastr.clear();
        if (TimeOut == undefined) {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "timeOut": "700"
            };
        }
        else {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "timeOut": TimeOut
            };
        }
        if (tipo == 1) { toastr.success(msg, title); }
        if (tipo == 2) { toastr.info(msg, title); }
        if (tipo == 3) { toastr.warning(msg, title); }
        if (tipo == 4) { toastr.error(msg, title); }
    }

    function getSucursales() {
        var select = Services.getSucursalAll();

        select.then(function (d) {
            $scope.sucursales = d.data;
            console.log($scope.sucursales);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    function getEncargado() {
        var select = Services.getUsers();

        select.then(function (d) {
            $scope.encargados = d.data;
            console.log($scope.encargados);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    function getAreas() {
        var select = Services.getAreas();

        select.then(function (d) {
            $scope.areas = d.data;
            console.log($scope.areas);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.saveArea = function () {
        alert($scope.nombrearea + " " + $scope.descripcion + " " + $scope.sucursal + " " + $scope.encargado);
        
        var today = new Date();
        var todayJson = today.toJSON();

        var Area = {
            nombre: $scope.nombrearea,
            descripcion: $scope.descripcion,
            idSucursal: $scope.sucursal,
            usuarioEncargado: $scope.encargado,
            activo: true,
            fechaIngreso:todayJson
        }
        var saveArea = Services.saveArea(Area);
        saveArea.then(function (d) {
            showNotification(1, 'Area registrada!', 'Correcto');
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            document.getElementById("clearform").reset();
            getAreas();
        }, function (error) {
            showNotification(4,"Error al registrar","Error");
        })
    }

    $scope.dltArea = function (id) {
        alert(id);
        var dlt = Services.deleteArea(id);
        dlt.then(function (d) {
            showNotification(1, 'Area eliminada!', 'Correcto', 1000);
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            getAreas();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    function getEquipoSinArea() {
        var select = Services.getEquipos();

        select.then(function (d) {
            $scope.equipos = d.data;
            console.log($scope.equipos);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.getAreaBySucId = function (id) {
        var servCall = Services.getAreaSuc(id);
        servCall.then(function (d) {
            $scope.areas = d.data;
            console.log($scope.areas)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }


    $scope.asignararea = function (equipo, id, areaid, cantidad ) {
        alert(equipo + " " + id + " " + areaid + " " + cantidad);

        var Equipo = {
            idArea: areaid,
            idEquipo: equipo,
            idSucursal: id,
            cantidad: cantidad,
            idUsuario: null,
            fechaUltimoServicio: null,
            fechaUltimoInven:null
        }

        var saveEquipo = Services.saveAsigEquipo(Equipo);
        saveEquipo.then(function (d) {
            showNotification(1, 'Equipo Asignado!', 'Correcto');
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            getEquipoSinArea();
        }, function (error) {
            showNotification(4, "Error al registrar", "Error");
        })
    }
    //$scope.makeEditable = function (obj) {
    //    obj.target.setAttribute("contenteditable", true);
    //    obj.target.focus();
    //};

})