using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
<<<<<<< HEAD
using System.Data.Entity;
using simeAlcatraz.Extensions;
=======
>>>>>>> 7355f75ef5cf883a31529eb5c1ad2edc9ce5d8e1
using simeAlcatraz.Models;
using System.Data.Entity;

namespace simeAlcatraz.Controllers
{
    public class fotosController : ApiController
    {
        private sime_dbEntities myEntity = new sime_dbEntities();
<<<<<<< HEAD
        
=======

>>>>>>> 7355f75ef5cf883a31529eb5c1ad2edc9ce5d8e1
        // GET api/fotos
        public IEnumerable<foto> Get()
        {
            return myEntity.fotos.AsEnumerable();
        }

        // GET api/fotos/5
        public foto Get(int id)
        {
            foto ft = myEntity.fotos.Find(id);
            return ft;

        }

        // POST api/fotos
        public void Post(foto ft)
        {
            if (ModelState.IsValid)
            {
                myEntity.fotos.Add(ft);
                myEntity.SaveChanges();
            }
        }

        // PUT api/fotos/5
        public void Put(foto ft)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(ft).State = EntityState.Modified;
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

        // DELETE api/fotos/5
        public void Delete(int id)
        {
            foto dlt = myEntity.fotos.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.fotos.Remove(dlt);
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
