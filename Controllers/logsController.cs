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
    public class logsController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/logs
        public IEnumerable<log> Get()
        {
            return myEntity.logs.AsEnumerable();
        }

        // GET api/logs/5
        public log Get(int id)
        {
            log lg = myEntity.logs.Find(id);
            return lg;

        }

        // POST api/logs
        public void Post(log lg)
        {
            if (ModelState.IsValid)
            {
                myEntity.logs.Add(lg);
                myEntity.SaveChanges();
            }
        }

        // PUT api/logs/5
        public void Put(log lg)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(lg).State = EntityState.Modified;
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

        // DELETE api/logs/5
        public void Delete(int id)
        {
            log dlt = myEntity.logs.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.logs.Remove(dlt);
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
