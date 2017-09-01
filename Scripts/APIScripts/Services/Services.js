app.service("Services", function ($http) {

    // ----------------- seccion de equipos ------------------------------------------------------------------------

    this.getEquipos = function () {
        return $http.get("/api/equipos")
    }

    this.getEquipoByID = function (id) {
        var url = '/api/equipos/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveEquipo = function (equipo) {
        return $http(
        {
            method: 'post',
            data: equipo,
            url: '/api/equipos'
        });
    }

    this.updateEquipo = function (equipo) {
        return $http(
        {
            method: 'put',
            data: equipo,
            url: '/api/equipos'
        });
    }


    this.deleteEquipo = function (id) {
        var url = '/api/equipos/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    // ----------------- seccion de categorias ------------------------------------------------------------------------


    this.getCategorias = function () {
        return $http.get("/api/categorias")
    }

    this.getCategoriaByID = function (id) {
        var url = '/api/categorias/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveCategoria = function (categoria) {
        return $http(
        {
            method: 'post',
            data: categoria,
            url: '/api/categorias'
        });
    }

    this.updateCategoria = function (categoria) {
        return $http(
        {
            method: 'put',
            data: categoria,
            url: '/api/categorias'
        });
    }


    this.deleteCategoria = function (id) {
        var url = '/api/categorias/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    

    // ----------------- seccion de subcategorias ------------------------------------------------------------------------

    this.getSubcategorias = function () {
        return $http.get("/api/subcategorias")
    }

    this.getSubcategoriaByID = function (id) {
        var url = '/api/subcategorias/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }


    this.getSubcategoriaByCategoriaID = function (id) {
        var url = '/api/subcategorias/GetByCategoryID/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }


    this.saveSubcategoria = function (subcategoria) {
        return $http(
        {
            method: 'post',
            data: subcategoria,
            url: '/api/subcategorias'
        });
    }

    this.updateSubcategoria = function (subcategoria) {
        return $http(
        {
            method: 'put',
            data: subcategoria,
            url: '/api/subcategorias'
        });
    }


    this.deleteSubcategoria = function (id) {
        var url = '/api/subcategorias/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    // ----------------- seccion de users ---------------------------------------------------------------------------------

    this.getUsers = function () {
        return $http.get("/api/usuarios")
    }

    this.getUserByID = function (id) {
        var url = '/api/usuarios/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveUser = function (usuario) {
        return $http(
        {
            method: 'post',
            data: usuario,
            url: '/api/usuarios'
        });
    }

    this.updateUser = function (usuario) {
        return $http(
        {
            method: 'put',
            data: usuario,
            url: '/api/usuarios'
        });
    }


    this.deleteUser = function (id) {
        var url = '/api/usuarios/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    // ----------------------------------- file upload --------------------------------------------

    //Get all photos saved on the server  
    function getAll() {

        return $http.get("api/fotos")
        
    }

    //Get photo from server with given file name        
    function getPhoto(fileName) {
        var url = '/api/fotos/' + fileName;
        return $http(
        {
            method: 'get',
            data: fileName,
            url: url
        });
    }

    // Delete photo on the server with given file name      
    function deletePhoto(fileName) {
        var url = '/api/fotos/' + fileName;
        return $http(
        {
            method: 'delete',
            data: fileName,
            url: url
        });
        
    }

    


});