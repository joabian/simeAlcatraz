app.controller('SubcategoriaController', function ($scope, Services) {
    //getSubcategorias();
    getSubcategoriasJoin();
    getCategorias();

    //function getSubcategorias() {
    //    var select = Services.getSubcategorias();

    //    select.then(function (d) {
    //        $scope.subcategorias = d.data;
            
    //    }, function (error) {
    //        console.log('Oops! Something went wrong while fetching the data.')
    //    })
    //};

    function getSubcategoriasJoin() {
        var select = Services.getSubcategoriasJoin();

        select.then(function (d) {
            $scope.subcategorias = d.data;
            console.log($scope.subcategorias);
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.updSubcategoria = function (subcategoria, eve, field) {
        
        subcategoria[field] = eve.currentTarget.innerText;

        var upd = Services.updateSubcategoria(subcategoria);
        upd.then(function (d) {
            getSubcategoriasJoin();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    };

    $scope.dltSubcategoria = function (id) {
        var dlt = Services.deleteSubcategoria(id);

        dlt.then(function (d) {
            getSubcategoriasJoin();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };

    $scope.saveSubcategoria = function () {
        

        var subcategoria = {
            nombre: $scope.nombre,
            categoriaID: $scope.category.categoriaID,
            activo: true
        };
        
        var save = Services.saveSubcategoria(subcategoria);
        save.then(function (d) {
            getSubcategoriasJoin();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })

    }

    function getCategorias() {
        var select = Services.getCategorias();

        select.then(function (d) {
            $scope.categorias = d.data;
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };

})