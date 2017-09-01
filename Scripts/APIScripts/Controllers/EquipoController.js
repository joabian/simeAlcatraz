app.controller('EquipoController', function ($scope, Services) {
    getAll();
    getCategorias();
    getSucursalesAll();
    getAllTask();

    function showNotification(tipo, msg, title, TimeOut) {
        toastr.clear();
        if (TimeOut == undefined) {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "timeOut": "700"
            };
        }
        else {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "timeOut": TimeOut
            };
        }
        if (tipo == 1) { toastr.success(msg, title); }
        if (tipo == 2) { toastr.info(msg, title); }
        if (tipo == 3) { toastr.warning(msg, title); }
        if (tipo == 4) { toastr.error(msg, title); }
    }

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
    $scope.getEquiposWhoutInven = function (id) {
        if (id == undefined) { id = 0; }
        var servCall = Services.getEquiposWhoutInv(id);
        servCall.then(function (d) {
            $scope.equiposWotInv = d.data;
            //console.log($scope.equiposWotInv)
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }
    $scope.saveChecklist = function (idcat, idsubcat, periodo) {
        var arrIdTask = [], arrIdEqui = [];
        var datosCheck = document.getElementsByName("tareasCheck");
        var equiposFcheck = document.getElementsByName("equiposFCheck");
       
        if (idcat != undefined && idsubcat != undefined && periodo != undefined) {
           // showNotification(2, "sddsd", "Equipos", 2000);
             if (equiposFcheck.length <= 0){
                showNotification(3, "No hay equipos", 'Nada encontrado', 4000);
             }
             else
             {
                 //showNotification(2, "Hay "+equiposFcheck.length+" equipos", 'Equipos', 4000);
                 for (i = 0; i < datosCheck.length; i++) { if (datosCheck[i].checked) { arrIdTask.push(datosCheck[i].value); } }
                 for (i = 0; i < equiposFcheck.length; i++) { if (equiposFcheck[i].checked) { arrIdEqui.push(equiposFcheck[i].value); } }
                 if (arrIdEqui.length <= 0) { showNotification(3, "Seleccione uno o varios equipos", 'Alerta', 4000); }
                 else
                 {
                     if (arrIdTask.length <= 0) {
                       showNotification(3,"Seleccione una o varias tareas","Seleccionar Tareas",4000)
                     }
                     else {
                         alert(arrIdEqui);
                         var idEq;
                        for (j = 0; j < arrIdEqui.length; j++)
                        {
                            alert("Ciclo: " + j + "de " + arrIdEqui.length);
                            idEq = arrIdEqui[j];
                            //alert(idEq);
                            var checklist = {
                                idEquipo: arrIdEqui[j],
                                descripcion: "N/A",
                                periodoServicio: periodo.peridoMantenimiento
                            };
                          
                            Services.saveCheckList(checklist);

                            for (k = 0; k < arrIdTask.length; k++) {
                                var actividades = {
                                    idChecklist: d.data,
                                    idTarea: arrIdTask[k],
                                    activo: true
                                }
                                Services.saveActividades(actividades);
                            }
                          
                            Services.updEquipoHasCheck(arrIdEqui[j], "hasCheckList", 'true');
                            

                         }
                     }
                    
                 }
             }
        }
        else {
            var faltaPeriodo = "", faltaCate = "", faltaSubcate = "";
            if (periodo == null || periodo == undefined) { faltaPeriodo = "Periodo de mantenimiento"; }
            if (idcat == null || idcat == undefined) { faltaCate = "Categoria"; }
            if (idsubcat == null || idsubcat == undefined) { faltaSubcate = "Subcategoria"; }
           
            showNotification(3, "Seleccione: <br />" + faltaCate + "<br />" + faltaSubcate + "<br />" + faltaPeriodo, "Seleccionar Opciones", 5000);
        }
    }

    $scope.savePeriodo = function (idcat, idsubcat, periodo) {
        var arrIdEqui = [];
        var equiposFcheck = document.getElementsByName("equiposFCheck");

        if (idcat != undefined && idsubcat != undefined && periodo != undefined) {
            // showNotification(2, "sddsd", "Equipos", 2000);
            if (equiposFcheck.length <= 0) {
                showNotification(3, "No hay equipos", 'Nada encontrado', 4000);
            }
            else {
                for (i = 0; i < equiposFcheck.length; i++) { if (equiposFcheck[i].checked) { arrIdEqui.push(equiposFcheck[i].value); } }
                if (arrIdEqui.length <= 0) { showNotification(3, "Seleccione uno o varios equipos", 'Alerta', 4000); }
                else
                {
                        for (j = 0; j < arrIdEqui.length; j++) {
                           
                            var updEquip = Services.updEquip(arrIdEqui[j],"periodoServNum",periodo.peridoMantenimiento);
                            updEquip.then(function (d) {
                                $scope.getEquiposWhoutInven(idsubcat.subcategoriaID);
                                showNotification(1, "Periodo registrado!", "Exito", 1000);

                            }, function (error) {
                                showNotification(4, "Oops! Something went wrong while saving the data.", "Error", 3000);
                            })
                        }
                    

                }
            }
        }
        else {
            var faltaPeriodo = "", faltaCate = "", faltaSubcate = "";
            if (periodo == null || periodo == undefined) { faltaPeriodo = "Periodo de mantenimiento"; }
            if (idcat == null || idcat == undefined) { faltaCate = "Categoria"; }
            if (idsubcat == null || idsubcat == undefined) { faltaSubcate = "Subcategoria"; }

            showNotification(3, "Seleccione: <br />" + faltaCate + "<br />" + faltaSubcate + "<br />" + faltaPeriodo, "Seleccionar Opciones", 5000);
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
       
        var saveEquipo = Services.saveEquipo(equipo);
        saveEquipo.then(function (d) {
            //getAll();
            showNotification(1, 'Equipo registrado!', 'Correcto');
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            document.getElementById("toclearform").reset();
          
        }, function (error) {
            showNotification(4,"Error al registrar","Error");
        })

    }

})