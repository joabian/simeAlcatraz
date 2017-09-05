using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class AreasViewController : Controller
    {
        // GET: AreasView
        public ActionResult agregarArea()
        {
            return View();
        }

        public ActionResult asignarEquipo()
        {
            return View();
        }
    }
}
