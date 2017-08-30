app.controller('EquipoController', function ($scope, Services) {
    getAll();
    getCategorias();
    getSucursalesAll();
    getAllTask();

    $scope.resultado = $scope.codigo + 10;

    $scope.periodoMantenimiento = [
    { idperiodo: 1, peridoMantenimiento: 1, nombrePeriodo: "Diario" },
    { idperiodo: 2, peridoMantenimiento: 7, nombrePeriodo: "Semanal" },
    { idperiodo: 3, peridoMantenimiento: 15, nombrePeriodo: "Quincenal" },
    { idperiodo: 4, peridoMantenimiento: 30, nombrePeriodo: "Mensual" },
    { idperiodo: 5, peridoMantenimiento: 60, nombrePeriodo: "Bimensual" }
    ];

    function getAllTask() {
        var servCall = Services.getTareas();
        servCall.then(function (d) {
            $scope.tareascheck = d.data;
            // console.log($scope.equipos)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }

    function getAll() {
        var servCall = Services.getEquipos();
        servCall.then(function (d) {
            $scope.equipos = d.data;
           // console.log($scope.equipos)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };
    function getCategorias() {
        var servCall = Services.getCategorias();
        servCall.then(function (d) {
            $scope.categorias = d.data;
            //console.log($scope.categorias)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };
    function getSucursalesAll() {
        var getSucur = Services.getSucursalAll();
        getSucur.then(function (d) {
            $scope.sucursales = d.data;
            //console.log($scope.sucursales)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    };
    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };
    $scope.makeEditable2 = function (obj, id) {
        obj.currentTarget.innerHTML = '';
        obj.target.focus();
        var sd = "categoria" + id;
        var sel = document.getElementById(sd).style.display = "";
     
        
    }
    
    $scope.getEquiposWhoutCheck = function (id) {
        if (id == undefined) { id = 0; }
        var servCall = Services.getEquiposWhoutCkl(id);
        servCall.then(function (d) {
            $scope.equiposWotck = d.data;
            //console.log($scope.equiposWotck)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }
  
    $scope.saveChecklist = function (idcat,idsubcat,periodo) {
        
        alert(idcat.categoriaID + " " + idsubcat.subcategoriaID + " " + periodo.peridoMantenimiento);
        if ($scope.periodomant != undefined && $scope.category != undefined && $scope.subcategory != undefined) {
            alert($scope.periodomant + " " + $scope.category + " " + $scope.subcategory);
        }
        else {
            var faltaPeriodo = "", faltaCate = "", faltaSubcate = "";
            if ($scope.periodoMantenimiento.periodomant == null || $scope.periodoMantenimiento.periodomant == undefined) { faltaPeriodo = "Periodo de mantenimiento"; }
            if ($scope.category == null || $scope.category == undefined) { faltaCate = "Categoria"; }
            if ($scope.subcategory == null || $scope.subcategory == undefined) { faltaSubcate = "Subcategoria"; }
           
            alert("Por favor selecccione: \n" + faltaCate + "\n" + faltaSubcate + "\n" + faltaPeriodo);
        }
    }
    $scope.getAllTaskForOnecheck = function (id, arrDatos) {
        //var datos = document.getElementsByName("tareasCheck");
        //var cantidad = elemento.length;
        //alert(id+" "+arrDatos+" "+arrDatos.length)
        var Estatus;
        for (i = 0; i < arrDatos.length; i++) {
            //alert("2doCiclo: "+i+"de: "+arrDatos.length);
            var tarID = arrDatos[i];

            var data = new FormData();
            data.append('checkid', id);
            data.append('tareaid', tarID);
            var url = "views/PhpApi/actividadesAdd.php";

            $.ajax({
                async: false,
                url: url,
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (dataRes) { genStatus = dataRes.Status }
                    ,
                error: function (r) {
                    alert("Error del servidor");
                }
            });
            //alert(Estatus);
            if (genStatus != true) {
                genStatus = false;
                break;
            }
        }
    }
    $scope.updEquipo = function (equipo, eve, field) {
        equipo[field] = eve.currentTarget.innerText;
        var upd = Services.updateEquipo(equipo);
        upd.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    }
    $scope.updateSubcat = function (id) {
        if (id == undefined) { id = 0;}
        var servCall = Services.getUpdSubcategoria(id);
        servCall.then(function (d) {
            $scope.subcategorias = d.data;
           //console.log($scope.subcategorias)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }
    $scope.getEquipoByThreeIds= function(){
        if ($scope.sucursalMod && $scope.catego != undefined) {
            var IdSucursal = $scope.sucursalMod.id;
            var IdCategoria = $scope.catego.categoriaID;
            var IdSubcategoria = $scope.subcategorias.subca;
            if (IdSubcategoria == undefined){ IdSubcategoria = 0; }
            //alert("Sucursal: " + IdSucursal + " Categoria: " + IdCategoria + " Subcategoria: " + IdSubcategoria);
            var servCall = Services.getEquiposByIds(IdSucursal, IdCategoria, IdSubcategoria);
            servCall.then(function (d) {
                $scope.equiposfromVwStock = d.data;
                console.log($scope.equiposfromVwStock)
            }, function (error) {
                console.log('Oops! Something went wrong while fetching the data.')
            })
        }
        else {
            if ($scope.sucursalMod == undefined && $scope.catego == undefined) { alert("Seleccione sucursal y Categoria"); }
            else {
                if ($scope.sucursalMod == undefined) { alert("Seleccione una sucursal") }
                if ($scope.catego == undefined) { alert("Seleccione una categoria") }
            }
        } 
    }
    $scope.getEquipWithOutCheck = function (id) {
        var servCall = Services.getEquipos();
        servCall.then(function (d) {
            $scope.equipos = d.data;
            // console.log($scope.equipos)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }
    $scope.loadActioncarEsp = function () {
        $scope.valAction = $scope.seloadAction;
    }
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