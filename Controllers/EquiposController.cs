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
    public class EquiposController : ApiController
    {

        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/equipos
        public IEnumerable<equipo> Get()
        {
            return myEntity.equipoes.AsEnumerable();
        }

        // GET api/equipos/5
        public equipo Get(int id)
        {
            equipo fnd = myEntity.equipoes.Find(id);
            return fnd;
        }

        // POST api/equipos
        public void Post(equipo equipo)
        {

            if (ModelState.IsValid)
            {
                myEntity.equipoes.Add(equipo);
                myEntity.SaveChanges();
            }
        }

        // PUT api/equipos/5
        public void Put(equipo equipo)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(equipo).State = EntityState.Modified;
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

        // DELETE api/equipos/5
        public void Delete(int id)
        {
            equipo dlt = myEntity.equipoes.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.equipoes.Remove(dlt);
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
