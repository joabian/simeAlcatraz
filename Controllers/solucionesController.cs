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
    public class solucionesController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/soluciones
        public IEnumerable<solucione> Get()
        {
            return myEntity.soluciones.AsEnumerable();
        }

        // GET api/soluciones/5
        public solucione Get(int id)
        {
            solucione sol = myEntity.soluciones.Find(id);
            return sol;

        }

        // POST api/soluciones
        public void Post(solucione sol)
        {
            if (ModelState.IsValid)
            {
                myEntity.soluciones.Add(sol);
                //myEntity.Database.ExecuteSqlCommand("UPDATE incidencias SET status=2 WHERE incidenciaID = " + susp.incidenciaID);

                myEntity.SaveChanges();
            }
        }

        // PUT api/soluciones/5
        public void Put(solucione sol)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(sol).State = EntityState.Modified;
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

        // DELETE api/soluciones/5
        public void Delete(int id)
        {
            solucione dlt = myEntity.soluciones.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.soluciones.Remove(dlt);
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
