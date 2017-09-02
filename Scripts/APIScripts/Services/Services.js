app.service("Services", function ($http) {

//----------service Equipos    
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

//----------Servicio de incidencias --


    this.getIncidencias = function () {
        return $http.get("/api/incidencias")
    }

    this.getIncidenciaByID = function (id) {
        var url = '/api/incidencias/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveIncidencia = function (Inc) {
        return $http(
        {
            method: 'post',
            data: Inc,
            url: '/api/incidencias'
        });
    }

    this.updateIncidencia = function (Inc) {
        return $http(
        {
            method: 'put',
            data: Inc,
            url: '/api/incidencias'
        });
    }


    this.updateIncidenciaField = function (id,field,val) {
        return $http(
        {
            method: 'post',
            url: '/api/incidencias/updateField/' + id + "/" + field + "/" + val
        });
    }

    this.deleteIncidencia = function (id) {
        var url = '/api/incidencias/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    //----------Servicio de sucursales --


    this.getSucursales = function () {
        return $http.get("/api/sucursales")
    }

    this.getSucursalesByID = function (id) {
        var url = '/api/sucursales/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveSucursal = function (Suc) {
        return $http(
        {
            method: 'post',
            data: Suc,
            url: '/api/sucursales'
        });
    }

    this.updateSucursal = function (Suc) {
        return $http(
        {
            method: 'put',
            data: Suc,
            url: '/api/sucursales'
        });
    }


    this.deleteSucursal = function (id) {
        var url = '/api/sucursales/' + id;
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

    // ----------------- seccion de Suspenciones ---------------------------------------------------------------------------------

    this.getSusp = function () {
        return $http.get("/api/suspenciones")
    }

    this.getSuspByID = function (id) {
        var url = '/api/suspenciones/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveSusp = function (suspencion) {
        return $http(
        {
            method: 'post',
            data: suspencion,
            url: '/api/suspenciones'
        });
    }

    this.updateSusp = function (suspencion) {
        return $http(
        {
            method: 'put',
            data: suspencion,
            url: '/api/suspenciones'
        });
    }


    this.deleteSusp = function (id) {
        var url = '/api/suspenciones/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }

    // ----------------- seccion de Soluciones ---------------------------------------------------------------------------------

    this.getSol = function () {
        return $http.get("/api/soluciones")
    }

    this.getSolByID = function (id) {
        var url = '/api/soluciones/' + id;
        return $http(
        {
            method: 'get',
            data: id,
            url: url
        });
    }

    this.saveSol = function (solucion) {
        return $http(
        {
            method: 'post',
            data: solucion,
            url: '/api/soluciones'
        });
    }

    this.updateSol = function (solucion) {
        return $http(
        {
            method: 'put',
            data: solucion,
            url: '/api/soluciones'
        });
    }


    this.deleteSol = function (id) {
        var url = '/api/soluciones/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }
});