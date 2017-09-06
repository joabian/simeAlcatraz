using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class incidenciasViewController : Controller
    {
        // GET: IncidenciasView
        public ActionResult incidencias()
        {
            return View();
        }

        public ActionResult incidenProb()
        {
            return View();
        }

        public ActionResult incidenSusp()
        {
            return View();
        }
        public ActionResult incidenSol()
        {
            return View();
        }
                
        public ActionResult incidenCerradas()
        {
            return View();
        }
    }
}
