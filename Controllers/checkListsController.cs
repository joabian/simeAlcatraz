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
    public class checkListsController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/checklists
        public IEnumerable<checklist> Get()
        {
            return myEntity.checklists.AsEnumerable();
        }

        // GET api/checklists/5
        public checklist Get(int id)
        {
            checklist chl = myEntity.checklists.Find(id);
            return chl;

        }

        // POST api/checklists
        public void Post(checklist chl)
        {
            if (ModelState.IsValid)
            {
                myEntity.checklists.Add(chl);
                myEntity.SaveChanges();
            }
        }

        // PUT api/checklists/5
        public void Put(checklist chl)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(chl).State = EntityState.Modified;
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

        // DELETE api/checklists/5
        public void Delete(int id)
        {
            checklist dlt = myEntity.checklists.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.checklists.Remove(dlt);
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
