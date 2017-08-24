app.controller('CategoriaController', function ($scope, Services) {
    
    getCategorias();

    function getCategorias() {
        var select = Services.getCategorias();

        select.then(function (d) {
            $scope.categorias = d.data;
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.updCategoria = function (categoria, eve) {
        categoria.nombre = eve.currentTarget.innerText;

        var upd = Services.updateCategoria(categoria);

        upd.then(function (d) {
            getCategorias();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.dltCategoria = function (id) {
        var dlt = Services.deleteCategoria(id);

        dlt.then(function (d) {
            getCategorias();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveCategoria = function () {

        var categoria = {
            nombre: $scope.nombre,
            activo: true,
            fechaIngreso: new Date()
        };

        var save = Services.saveCategoria(categoria);

        save.then(function (d) {
            getCategorias();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };

})