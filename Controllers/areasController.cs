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
    public class areasController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/areas
        public IEnumerable<area> Get()
        {
            return myEntity.areas.AsEnumerable();
        }

        // GET api/areas/5
        public area Get(int id)
        {
            area ar = myEntity.areas.Find(id);
            return ar;

        }

        // GET api/areas/SelectByEncargadoID/5
        public IEnumerable<area> SelectByEncargadoID(int id)
        {
            var query = from mysub in myEntity.areas.AsEnumerable()
                        where mysub.usuarioEncargado == id
                        select mysub;
            return query;
        }


        // POST api/areas
        public void Post(area ar)
        {
            if (ModelState.IsValid)
            {
                myEntity.areas.Add(ar);
                myEntity.SaveChanges();
            }
        }

        // PUT api/areas/5
        public void Put(area ar)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(ar).State = EntityState.Modified;
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

        // DELETE api/areas/5
        public void Delete(int id)
        {
            area dlt = myEntity.areas.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.areas.Remove(dlt);
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
