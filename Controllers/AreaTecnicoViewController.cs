using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class AreaTecnicoViewController : Controller
    {
        // GET: AreaTecnicoView
        public ActionResult controlinventario()
        {
            return View();
        }
        public ActionResult controlmantenimiento()
        {
            return View();
        }
        public ActionResult setticket()
        {
            return View();
        }
        public ActionResult problemasolucion()
        {
            return View();
        }

    }
}
