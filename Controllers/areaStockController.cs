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

        [HttpPost]
        [Route("api/areastock/updateField/{id}/{fieldName}/{value}")]
        public void Post(int id, string fieldName, int value)
        {
            myEntity.Database.ExecuteSqlCommand("UPDATE areaStock SET [" + fieldName + "] = '" + value + "' WHERE id = '" + id + "'");
            myEntity.SaveChanges();
        }

        // GET api/areastock/GetByEquipID/1
        [HttpGet]
        [Route("api/areastock/GetByEquipoID/{idEq}/{idSc}/{idAr}")]
        public IEnumerable<areaStock> GetByEquipoID(int idEq, int idSc, int idAr)
        {

            var query = from mysub in myEntity.areaStocks.AsEnumerable()
            .Where(mysub => mysub.idEquipo == idEq
                && mysub.idSucursal == idSc
                && mysub.idArea == idAr)
                        select mysub;
            return query;
        }

        [HttpGet]
        [Route("api/areastock/test")]
        public string test()
        {
            return "test good";
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
