﻿app.controller('EquipoController', function ($scope, Services) {
    //getAll();
    getCategorias();

    $scope.resultado = $scope.codigo + 10;

    function getAll() {
        var servCall = Services.getEquipos();
        servCall.then(function (d) {
            $scope.equipos = d.data;
            console.log($scope.equipos)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };
    function getCategorias() {
        var servCall = Services.getCategorias();
        servCall.then(function (d) {
            $scope.categorias = d.data;
            console.log($scope.categorias)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };
    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };

    $scope.udtEquipo = function () {
        var isSerializado = $scope.checked;
        var serial = "N/A";
        if (isSerializado != undefined) {
            if (isSerializado) { if ($scope.noserie != undefined) { serial = $scope.noserie; } else { isSerializado = false; } }
        }

        else { isSerializado = false; }

        var equipo = {
            equipoID:$scope.idequipo,
            descripcion: $scope.descripcion,
            fechaIngreso: new Date(),
            id_categoria: 1,
            id_subcategoria: 1,
            activo: true,
            marcaEquipo: $scope.marcaEquipo,
            nombreEquipo: $scope.nombreEquipo,
            modeloEquipo: $scope.modelo,
            serializado: isSerializado,
            numeroSerie: serial,
            fechaModifico: new Date(),
            userModifico: 'admin',
            userCaptura: 'admin',
            areaStatus: false,
            hasCheckList: false,
            periodoServ: false,
            periodoServNum: 0
        };
        console.log(equipo);
        var saveEquipo = Services.updateEquipo(equipo);
        saveEquipo.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })
    };
  
    $scope.dltEquipo = function (id) {
        var dlt = Services.deleteEquipo(id);
        dlt.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveEquipo = function () {
        var isSerializado = $scope.checked;
        var serial = "N/A";
        if (isSerializado != undefined) {
            if (isSerializado) { if ($scope.noserie != undefined) { serial = $scope.noserie; } else { isSerializado = false; } }
        }

        else { isSerializado = false; }

        var equipo = {
            //equipoID:4,
            descripcion: $scope.descripcion,
            fechaIngreso: new Date(),
            id_categoria: 1,
            id_subcategoria: 1,
            activo: true,
            marcaEquipo: $scope.marcaEquipo,
            nombreEquipo: $scope.nombreEquipo,
            modeloEquipo: $scope.modelo,
            serializado: isSerializado,
            numeroSerie: serial,
            fechaModifico: new Date(),
            userModifico: 'admin',
            userCaptura: 'admin',
            areaStatus: false,
            hasCheckList: false,
            periodoServ: false,
            periodoServNum: 0
        };
        console.log(equipo);
        var saveEquipo = Services.saveEquipo(equipo);
        saveEquipo.then(function (d) {
            //getAll();   
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            document.getElementById("toclearform").reset();
          
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    }

})