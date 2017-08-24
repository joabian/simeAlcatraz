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
    public class stockController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/stock
        public IEnumerable<stock> Get()
        {
            return myEntity.stocks.AsEnumerable();
        }

        // GET api/stock/5
        public stock Get(int id)
        {
            stock stk = myEntity.stocks.Find(id);
            return stk;

        }

        // POST api/stock
        public void Post(stock stk)
        {
            if (ModelState.IsValid)
            {
                myEntity.stocks.Add(stk);
                myEntity.SaveChanges();
            }
        }

        // PUT api/stock/5
        public void Put(stock stk)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(stk).State = EntityState.Modified;
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

        // DELETE api/stock/5
        public void Delete(int id)
        {
            stock dlt = myEntity.stocks.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.stocks.Remove(dlt);
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
