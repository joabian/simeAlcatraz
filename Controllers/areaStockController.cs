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
    public class areaStockController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/areastock
        public IEnumerable<areaStock> Get()
        {
            return myEntity.areaStocks.AsEnumerable();
        }



        // GET api/areastock/5
        public areaStock Get(int id)
        {
            areaStock fnd = myEntity.areaStocks.Find(id);
            return fnd;
        }

        // POST api/areastock
        public int Post(areaStock areaStock)
        {
            int id;
            id = 0;
            if (ModelState.IsValid)
            {
                myEntity.areaStocks.Add(areaStock);
                myEntity.SaveChanges();
                id = areaStock.id;
            }

            return id;
        }

        // PUT api/areastock/5
        public void Put(areaStock areaStock)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(areaStock).State = EntityState.Modified;
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

        // DELETE api/areastock/5
        public void Delete(int id)
        {
            areaStock dlt = myEntity.areaStocks.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.areaStocks.Remove(dlt);
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
