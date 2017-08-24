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
    public class rolesController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/roles
        public IEnumerable<role> Get()
        {
            return myEntity.roles.AsEnumerable();
        }

        // GET api/roles/5
        public role Get(int id)
        {
            role rl = myEntity.roles.Find(id);
            return rl;

        }

        // POST api/roles
        public void Post(role rl)
        {
            if (ModelState.IsValid)
            {
                myEntity.roles.Add(rl);
                myEntity.SaveChanges();
            }
        }

        // PUT api/roles/5
        public void Put(role rl)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(rl).State = EntityState.Modified;
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

        // DELETE api/roles/5
        public void Delete(int id)
        {
            role dlt = myEntity.roles.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.roles.Remove(dlt);
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
