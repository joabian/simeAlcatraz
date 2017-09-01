using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class ConfiguracionViewController : Controller
    {
        // GET: ConfiguracionView
        public ActionResult categorias()
        {
            return View();
        }
        public ActionResult subcategorias()
        {
            return View();
        }
        public ActionResult users()
        {
            return View();
        }
    }
}