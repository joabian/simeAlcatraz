using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using simeAlcatraz.Models;

namespace simeAlcatraz.Controllers
{
    public class serviciosController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/servicios
        public IEnumerable<servicio> Get()
        {
            return myEntity.servicios.AsEnumerable();
        }

        // GET api/servicios/5
        public servicio Get(int id)
        {
            servicio svc = myEntity.servicios.Find(id);
            return svc;

        }

        // POST api/servicios
        public void Post(servicio svc)
        {
            if (ModelState.IsValid)
            {
                myEntity.servicios.Add(svc);
                myEntity.SaveChanges();
            }
        }

        // PUT api/servicios/5
        public void Put(servicio svc)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(svc).State = EntityState.Modified;
                try
                {
                    myEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        // DELETE api/servicios/5
        public void Delete(int id)
        {
            servicio dlt = myEntity.servicios.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.servicios.Remove(dlt);
                    myEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }

        }
    }
}
