using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class ConfigurationViewController : Controller
    {
        //
        // GET: /ConfigurationView/
        public ActionResult categories()
        {
            return View();
        }

        public ActionResult subcategories()
        {
            return View();
        }

        public ActionResult users()
        {
            return View();
        }
	}
}