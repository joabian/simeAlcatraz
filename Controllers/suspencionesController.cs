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
    public class suspencionesController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/suspenciones
        public IEnumerable<suspencione> Get()
        {
            return myEntity.suspenciones.AsEnumerable();
        }

        // GET api/suspenciones/5
        public suspencione Get(int id)
        {
            suspencione susp = myEntity.suspenciones.Find(id);
            return susp;

        }

        // POST api/suspenciones
        public void Post(suspencione susp)
        {
            if (ModelState.IsValid)
            {
                myEntity.suspenciones.Add(susp);
                myEntity.SaveChanges();
            }
        }

        // PUT api/suspenciones/5
        public void Put(suspencione susp)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(susp).State = EntityState.Modified;
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

        // DELETE api/suspenciones/5
        public void Delete(int id)
        {
            suspencione dlt = myEntity.suspenciones.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.suspenciones.Remove(dlt);
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
