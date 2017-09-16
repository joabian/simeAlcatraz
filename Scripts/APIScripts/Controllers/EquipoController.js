app.controller('EquipoController', function ($scope, Services) {
    getAll();
    getCategorias();
    getSucursalesAll();
    getAllTask();
    getAllJoin();
    $scope.equiposfromVwStock = [];


    function simpleAlert(title, text, type) {
        if (type == 0) { type = "" } if (type == 1) { type = "success" } if (type == 2) { type = "warning" }
        swal({
            title: title,
            text: text,
            type: type,
        });
    }
    function confirmAlert(title, text, textButton, type, titleOk, msgOk) {
        if (type == 0) { type = "" } if (type == 1) { type = "success" } if (type == 2) { type = "warning" }
        swal({
            title: title,
            text: text,
            type: type,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: textButton,
            closeOnConfirm: false
        }
       , function () {
           swal(titleOk, msgOk, "success");
       });
    }
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

    $scope.SubSelected = []

    $scope.updateList = function (id) {
        if (isInArray(id, $scope.SubSelected)) {
            $scope.SubSelected = removeA($scope.SubSelected, id);
        } else {
            $scope.SubSelected.push(id)
        }
        
        $scope.getEquipoByThreeIds();
    };

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }


    function getAllJoin() {
        var servCall = Services.getAllJoin();
        servCall.then(function (d) {
            $scope.equiposJoin = d.data;
            //console.log($scope.equipos)
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
                 simpleAlert("0 equipos", "No se encontro ningun equipo", 2);
             }
             else
             {
                 //showNotification(2, "Hay "+equiposFcheck.length+" equipos", 'Equipos', 4000);
                 for (i = 0; i < datosCheck.length; i++) { if (datosCheck[i].checked) { arrIdTask.push(datosCheck[i].value); } }
                 for (i = 0; i < equiposFcheck.length; i++) { if (equiposFcheck[i].checked) { arrIdEqui.push(equiposFcheck[i].value); } }
                 if (arrIdEqui.length <= 0) { simpleAlert("Seleccionar equipos", "Seleccione uno o varios equipos", 2); }
                 else
                 {
                     if (arrIdTask.length <= 0) {
                         //showNotification(3, "Seleccione una o varias tareas", "Seleccionar Tareas", 4000)
                         simpleAlert("Seleccionar tareas", "Seleccione una o varias tareas", 2);
                     }
                     else {
                         var stat;
                         var idEq;
                         for (j = 0; j < arrIdEqui.length; j++)
                         {
                             idEq = arrIdEqui[j];
                             var checklist = {
                                 idEquipo: arrIdEqui[j],
                                 descripcion: "N/A",
                                 periodoServicio: periodo.peridoMantenimiento
                             };
                             $scope.saveInvididualCheck(checklist, idEq, arrIdTask, idsubcat.subcategoriaID);
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
           
            simpleAlert("Seleccionar opciones", "Seleccione: \n" + faltaCate + "\n" + faltaSubcate + "\n" + faltaPeriodo, 2);
        }
    }

    $scope.saveInvididualCheck = function (checklist, idEquipo,arrTareas,idSubc) {
        var svcheck = Services.saveCheckList(checklist);
        svcheck.then(function (d) {
            Services.updEquipoField(idEquipo, "hasCheckList", 'true');
            for (k = 0; k < arrTareas.length; k++) {
                var actividades = {
                    idChecklist: d.data,
                    idTarea: arrTareas[k],
                    activo: true
                }
                Services.saveActividades(actividades);
                $scope.getEquiposWhoutCheck(idSubc);
                if ((k + 1) == arrTareas.length) {
                    showNotification(1, "Checklist registrado! ", "Exito", 1000);
                }
            } 
        }, function (error) {
            showNotification(4, "Oops! Something went wrong while saving the data.", "Error", 3000);
        });
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
                           
                            var updEquip = Services.updEquipoField(arrIdEqui[j], "periodoServNum", periodo.peridoMantenimiento);
                            updEquip.then(function (d) {
                                $scope.getEquiposWhoutInven(idsubcat.subcategoriaID);
                                

                            }, function (error) {
                                //showNotification(4, "Oops! Something went wrong while saving the data.", "Error", 3000);
                            })

                            var updEquip = Services.updEquipoField(arrIdEqui[j], "periodoServ", "true");
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
            $scope.SubSelected = [];
            
        }, function (error) {
            console.log('Oops! Something went wrong while fetching the data.')
        })
    }

    

    
    $scope.getEquipoByThreeIds = function () {
        //alert("entra");
        if ($scope.sucursalMod && $scope.catego != undefined) {
            var IdSucursal = $scope.sucursalMod.id;
            var IdCategoria = $scope.catego.categoriaID;
            //var IdSubcategoria = $scope.subcategorias.subca;
            if ($scope.SubSelected.length == 0) {
                var servCall = Services.getEquiposByIds(IdSucursal, IdCategoria, 0);
                servCall.then(function (d) {
                    $scope.equiposfromVwStock = d.data;

                    //console.log($scope.equiposfromVwStock)
                }, function (error) {
                    //console.log('Oops! Something went wrong while fetching the data.')
                })
            } else {
                $scope.equiposfromVwStock = [];
                for (i = 0; i < $scope.SubSelected.length; i++) {
                    var servCall = Services.getEquiposByIds(IdSucursal, IdCategoria, $scope.SubSelected[i]);
                    servCall.then(function (d) {
                        $scope.equiposfromVwStock = $scope.equiposfromVwStock.concat(d.data);
                        //console.log($scope.equiposfromVwStock)
                    }, function (error) {
                        //console.log('Oops! Something went wrong while fetching the data.')
                    })
                }
            }

            


            
        }
        else {
            if ($scope.sucursalMod == undefined && $scope.catego == undefined) { simpleAlert("Alerta","Seleccione una sucursal y una categoria!.",2)}
            else {
                if ($scope.sucursalMod == undefined) { simpleAlert("Alerta", "Seleccione una sucursal!.", 2) }
                if ($scope.catego == undefined) { simpleAlert("Alerta", "Seleccione una categoria!.", 2) }
            }
        } 
    }

    $scope.showAlert = function () {
        confirmAlert("Eliminar equipo", "Desea borrar este equipo?", "Borrar equipo", 2, "Eliminado", "El equipo se elimino exitosamente");
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
            id_categoria: $scope.category.categoriaID,
            id_subcategoria: $scope.subcategory.subcategoriaID,
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