using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simeAlcatraz.Controllers
{
    public class TicketsViewController : Controller
    {
        // GET: IncidenciasView
        public ActionResult ticketForm()
        {
            return View();
        }

        public ActionResult ticketLink()
        {
            return View();
        }
    }
}
