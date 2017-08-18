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
    public class incidenciasController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/incidencias
        public IEnumerable<incidencia> Get()
        {
            return myEntity.incidencias.AsEnumerable();
        }

        // GET api/incidencias/5
        public incidencia Get(int id)
        {
            incidencia ins = myEntity.incidencias.Find(id);
            return ins;

        }

        // POST api/incidencias
        public void Post(incidencia inc)
        {
            if (ModelState.IsValid)
            {
                myEntity.incidencias.Add(inc);
                myEntity.SaveChanges();
            }
        }

        // PUT api/incidencias/5
        public void Put(incidencia inc)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(inc).State = EntityState.Modified;
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

        // DELETE api/incidencias/5
        public void Delete(int id)
        {
            incidencia dlt = myEntity.incidencias.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.incidencias.Remove(dlt);
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
