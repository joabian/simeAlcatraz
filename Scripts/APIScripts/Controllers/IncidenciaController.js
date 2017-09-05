app.controller('IncidenciaController', function ($scope, Services, $rootScope) {
    getIncidencias();

    function getIncidencias() {
        var selInc = Services.getIncidencias();
        selInc.then(function (d) {
            $rootScope.incidencias = d.data;
           
        }, function (error) {
            console.log('algo salio mal!')
        })
    };
    
    $scope.makEdit = function (ob) {
        ob.target.setAttribute("contenteditable", true);
        ob.target.focus();
    };

    $scope.updateIncidencia = function (ob) {
        var id = ob.currentTarget.value;       
       
        
        var upd = Services.updateIncidenciaField(id,"status","3");
        upd.then(function(d){
            getIncidencias();
        }, function (error) {
            console.log("No se hizo el cambio")
        })       
    };

    $scope.deleteIncidencia = function (id) {
        var dlt = Services.deleteIncidencia(id);
        dlt.then(function (d) {
            getIncidencias();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveIncidencia = function () {
        var incidencia = {
            usuario: $scope.usuario,
            equipoID: $scope.equipoID,
            descripcion: $scope.descripcion,
            status: 1,
        };        
  
        var saveIncidencia = Services.saveIncidencia(incidencia);
        saveIncidencia.then(function (d) {
            getIncidencias();
            
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    }

    $scope.setVal = function (id, nmodal) {
        document.getElementById("aidi"+nmodal).value = id;
        document.getElementById("saveCh"+nmodal).value = id;
    }
   

    $scope.test = function(ob) {
        var id = ob.currentTarget.value;
        var comen = $scope.comentario;


        console.log(id);
    }

})