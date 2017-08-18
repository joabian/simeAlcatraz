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
    public class subcategoriasController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();
        
        // GET api/subcategoria3
        public IEnumerable<subcategoria> Get()
        {
            return myEntity.subcategorias.AsEnumerable();
        }

        // GET api/subcategoria/5
        public subcategoria Get(int id)
        {
            subcategoria fnd = myEntity.subcategorias.Find(id);

            return fnd;
        }


        // GET api/subcategoria/GetByCategoryID/5
        [Route("api/subcategorias/GetByCategoryID/{id}")]
        public IEnumerable<subcategoria> GetByCategoryID(int id)
        {
            var query = from mysub in myEntity.subcategorias.AsEnumerable()
                        where mysub.categoriaID == id
                        select mysub;
            return query;
        }

        // POST api/subcategoria
        public void Post(subcategoria subcategoria)
        {
            if (ModelState.IsValid)
            {
                myEntity.subcategorias.Add(subcategoria);
                myEntity.SaveChanges();
            }
        }

        // PUT api/subcategoria/5
        public void Put(subcategoria subcategoria)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(subcategoria).State = EntityState.Modified;
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

        // DELETE api/subcategoria/5
        public void Delete(int id)
        {
            subcategoria dlt = myEntity.subcategorias.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.subcategorias.Remove(dlt);
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
