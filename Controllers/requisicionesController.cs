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
    public class requisicionesController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/requisiciones
        public IEnumerable<requisicione> Get()
        {
            return myEntity.requisiciones.AsEnumerable();
        }

        // GET api/requisiciones/5
        public requisicione Get(int id)
        {
            requisicione req = myEntity.requisiciones.Find(id);
            return req;

        }

        // POST api/requisiciones
        public void Post(requisicione req)
        {
            if (ModelState.IsValid)
            {
                myEntity.requisiciones.Add(req);
                myEntity.SaveChanges();
            }
        }

        // PUT api/requisiciones/5
        public void Put(requisicione req)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(req).State = EntityState.Modified;
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

        // DELETE api/requisiciones/5
        public void Delete(int id)
        {
            requisicione dlt = myEntity.requisiciones.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.requisiciones.Remove(dlt);
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
