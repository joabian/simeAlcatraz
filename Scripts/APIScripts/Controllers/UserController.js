app.controller('UserController', function ($scope, Services, Upload) {
    getUsers();

    //$scope.dtOptions = DTOptionsBuilder.newOptions()
    //    .withDOM('<"html5buttons"B>lTfgitp')
    //    .withButtons([
    //        { extend: 'copy' },
    //        { extend: 'csv' },
    //        { extend: 'excel', title: 'ExampleFile' },
    //        { extend: 'pdf', title: 'ExampleFile' },

    //        {
    //            extend: 'print',
    //            customize: function (win) {
    //                $(win.document.body).addClass('white-bg');
    //                $(win.document.body).css('font-size', '10px');

    //                $(win.document.body).find('table')
    //                    .addClass('compact')
    //                    .css('font-size', 'inherit');
    //            }
    //        }
    //    ]);

    //repeat-done="initDataTable"
    



    function getUsers() {
        var select = Services.getUsers();

        select.then(function (d) {
            $scope.usuarios = d.data;
            console.log($scope.usuarios);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.updateUser = function (usuario, eve, field) {

        usuario[field] = eve.currentTarget.innerText;

        var upd = Services.updateUser(usuario);
        upd.then(function (d) {
            getUsers();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.deleteUser = function (id) {
        var dlt = Services.deleteUser(id);
        dlt.then(function (d) {
            getUsers();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveUser = function () {
        
        var usuario = {
            nombreUsuario: $scope.nombreUsuario,
            password: $scope.password,
            nombre: $scope.nombre,
            apellidoPaterno: $scope.apellidoPaterno,
            apellidoMaterno: $scope.apellidoMaterno,
            rfc: $scope.rfc,
            curp: $scope.curp,
            email: $scope.email,
            telefono: $scope.telefono,
            departamento: $scope.departamento,
            puesto: $scope.puesto,
            activo: true
        };
        console.log(usuario);
        var save = Services.saveUser(usuario);
        save.then(function (d) {
            getUsers();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };
    
    //Variables
    $scope.photos = [];
    $scope.files = [];
    $scope.previewPhoto = {};

    $scope.setPreviewPhoto = function (photo) {
        $scope.previewPhoto = photo;
    }

    $scope.activate = function () {

        Services.getAll()
          .then(function (data) {
              $scope.photos = data.data.Photos;

              setPreviewPhoto();
          }, function (err) {
              console.log("Error status: " + err.status);

          });
    }

    $scope.uploadFiles = function (files) {
        console.log("entra");
        Upload.upload({
            url: "/api/files/",
            data: { file: files }
        })
          .then(function (response) {
              activate();
              setPreviewPhoto();

          }, function (err) {
              console.log("Error status: " + err.status);

          });


    }

    $scope.removePhoto = function (photo) {
        Services.deletePhoto(photo.Name)
          .then(function () {
              activate();

              setPreviewPhoto();
          });
    }
})