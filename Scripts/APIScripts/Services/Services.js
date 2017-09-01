app.service("Services", function ($http) {

    // ====================================== <AREAS>=============================================  

    this.getUsers = function () {
        return $http.get("/api/usuarios")
    }

    this.saveArea = function (area) {
        return $http(
        {
            method: 'post',
            data: area,
            url: '/api/areas'
        });
    }

    this.getAreas = function () {
        return $http.get("/api/vwareas")
    }
    
    this.deleteArea = function (id) {
        var url = '/api/areas/' + id;
        return $http(
        {
            method: 'delete',
            data: id,
            url: url
        });
    }


    // ====================================== </AREAS>============================================
    

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

    this.saveCheckList = function (check) {
        return $http(
      {
          method: 'post',
          data: check,
          url: '/api/checkLists'
      });
    }
    this.saveActividades = function (activ) {
        return $http(
       {
          method: 'post',
          data: activ,
          url: '/api/actividades'
       });
    }
    this.getEquiposWhoutInv = function (idsubcat) {
        return $http.get("/api/vwstock/GetBySubcatInv/" + idsubcat)
    }
    this.updEquip = function (id,field,value) {
        return $http(
    {
       method: 'post',
       url: '/api/equipos/updateField/'+id+'/'+field+'/'+value
    });
    }

    this.updEquipoHasCheck = function (id,field,value) {
        return $http(
            {
                method: 'post',
                url: "/api/equipos/updateFieldChkl/"+id+"/"+value+"/"+field
            });
    }
});