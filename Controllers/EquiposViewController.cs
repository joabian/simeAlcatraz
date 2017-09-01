using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class EquiposViewController : Controller
    {
        //
        // GET: /EquiposView/
        public ActionResult agregarEquipo()
        {
            return View();
        }

        public ActionResult verInventario()
        {
            return PartialView("~/Views/EquiposView/verInventario.cshtml");
        }

        public ActionResult updateEquipo()
        {
            return View();
        }
        public ActionResult inventario()
        {
            return PartialView("~/Views/inventario.cshtml");
        }
        public ActionResult caracteriticasEspeciales()
        {
            return View();
        }
    }
}