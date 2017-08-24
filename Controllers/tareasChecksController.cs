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
    public class tareasChecksController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/tareaschecks
        public IEnumerable<tareasCheck> Get()
        {
            return myEntity.tareasChecks.AsEnumerable();
        }

        // GET api/tareaschecks/5
        public tareasCheck Get(int id)
        {
            tareasCheck tcheck = myEntity.tareasChecks.Find(id);
            return tcheck;

        }

        // POST api/tareaschecks
        public void Post(tareasCheck tcheck)
        {
            if (ModelState.IsValid)
            {
                myEntity.tareasChecks.Add(tcheck);
                myEntity.SaveChanges();
            }
        }

        // PUT api/tareaschecks/5
        public void Put(tareasCheck tcheck)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(tcheck).State = EntityState.Modified;
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

        // DELETE api/tareaschecks/5
        public void Delete(int id)
        {
            tareasCheck dlt = myEntity.tareasChecks.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.tareasChecks.Remove(dlt);
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
