app.service("Services", function ($http) {

    

    this.getEquipos = function () {
        return $http.get("/api/equipos")
    }

    this.getTareas = function () {
        return $http.get("/api/tareaschecks")
    }

    this.getCategorias = function () {
        return $http.get("/api/categorias")
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
    
    this.getSucursalAll = function () {
        return $http.get("/api/sucursales")
    }

    this.getUpdSubcategoria = function (id) {
        return $http.get("/api/subcategorias/GetByCategoryID/" + id)
    }
    this.getEquiposByIds = function (id1,id2,id3) {
        return $http.get("/api/vwstock/GetBySucNameCatSubcat/"+id1+"/"+id2+"/"+id3)
    }
    this.getEquiposWhoutCkl = function (idsubcat) {
        return $http.get("/api/vwstock/GetBySubcat/" + idsubcat)
    }
});