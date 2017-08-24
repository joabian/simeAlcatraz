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
    public class categoriasController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/categoria
        public IEnumerable<categoria> Get()
        {
            return myEntity.categorias.AsEnumerable();
        }

        // GET api/categoria/5
        public categoria Get(int id)
        {
            categoria fnd = myEntity.categorias.Find(id);
            return fnd;
        }

        // POST api/categoria
        public void Post(categoria categoria)
        {
            if (ModelState.IsValid)
            {
                myEntity.categorias.Add(categoria);
                myEntity.SaveChanges();
            }
        }

        // PUT api/categoria/5
        public void Put(categoria categoria)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(categoria).State = EntityState.Modified;
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

        // DELETE api/categoria/5
        public void Delete(int id)
        {
            categoria dlt = myEntity.categorias.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.categorias.Remove(dlt);
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
