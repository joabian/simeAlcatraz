using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using simeAlcatraz.Models;
using System.Threading.Tasks;
using System.Text;
using System.Net.Http.Headers;


namespace simeAlcatraz.Controllers
{
    public class EquiposController : ApiController
    {

        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/equipos
        public IEnumerable<equipo> Get()
        {
            return myEntity.equipoes.AsEnumerable();
        }

        // GET api/equipos
        [HttpGet]
        [Route("api/equipos/getAllJoin")]
        public Array GetAll()
        {
            //return myEntity.equipoes.AsEnumerable();
            var eq = from eqps in myEntity.equipoes
                     join cats in myEntity.categorias on eqps.id_categoria equals cats.categoriaID
                     join subs in myEntity.subcategorias on eqps.id_subcategoria equals subs.subcategoriaID
                     select new { 
                         equipoID = eqps.equipoID,
                         descripcion = eqps.descripcion,
                         activo = eqps.activo,
                         marcaEquipo = eqps.marcaEquipo,
                         nombreEquipo = eqps.nombreEquipo,
                         modeloEquipo = eqps.modeloEquipo,
                         serializado = eqps.serializado,
                         numeroSerie = eqps.numeroSerie,
                         id_categoria = eqps.id_categoria,
                         id_subcategoria = eqps.id_subcategoria,
                         nombreCategoria = cats.nombre, 
                         nombreSubcategoria = subs.nombre
                     };
            return eq.ToArray();
        }

        // GET api/equipos/5
        public equipo Get(int id)
        {
            equipo fnd = myEntity.equipoes.Find(id);
            return fnd;
        }

        // POST api/equipos
        public int Post(equipo equipo)
        {
            int id;
            id = 0;
            if (ModelState.IsValid)
            {
                myEntity.equipoes.Add(equipo);
                myEntity.SaveChanges();
                id = equipo.equipoID;
            }

            

            return id;
        }

        // PUT api/equipos/5
        public void Put(equipo equipo)
        {
            if (ModelState.IsValid)
            {
                myEntity.Entry(equipo).State = EntityState.Modified;
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

        // DELETE api/equipos/5
        public void Delete(int id)
        {
            equipo dlt = myEntity.equipoes.Find(id);
            if (dlt != null)
            {
                try
                {
                    myEntity.equipoes.Remove(dlt);
                    myEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
        // POST api/usuarios/updateField/id/name/value
        [Route("api/equipos/updateField/{id}/{fieldName}/{value}")]
        public void Post(int id, string fieldName, string value)
        {
            myEntity.Database.ExecuteSqlCommand("UPDATE equipo SET [" + fieldName + "] = '" + value + "' WHERE equipoID = '" + id + "'");
            myEntity.SaveChanges();
        }




        //[HttpPost]
        //[Route("api/equipos/postWithFile")]
        //public int Upload(equipo equipo)
        //{
        //    //, HttpPostedFileBase photo
        //    int id;
        //    id = 0;
        //    if (ModelState.IsValid)
        //    {

        //        string directory = @"~/Album";
        //        var fileUpload = equipo.Files[0];

        //        if (fileUpload != null && fileUpload.ContentLength > 0)
        //        {

        //            var supportedTypes = new[] { "jpg", "jpeg", "png" };

        //            var fileExt = System.IO.Path.GetExtension(fileUpload.FileName).Substring(1);

        //            if (!supportedTypes.Contains(fileExt))
        //            {
        //                id = 0;
        //            }
        //            else
        //            {
        //                var fileName = Path.GetFileName(fileUpload.FileName);
        //                fileUpload.SaveAs(Path.Combine(directory, fileName));
        //            }

        //        }

        //        myEntity.equipoes.Add(equipo);
        //        myEntity.SaveChanges();
        //        id = equipo.equipoID;
        //    }

        //    return id;

        //    //return RedirectToAction("Index");
        //}

        //[HttpPost]
        //[Route("api/equipos/postWithFile")]
        //public async Task<HttpResponseMessage> postWithFile(equipo equipo)  
        //{
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "The request doesn't contain valid content!");
        //    }
        //    else
        //    {
        //        try
        //        {
        //            var provider = new MultipartMemoryStreamProvider();
        //            await Request.Content.ReadAsMultipartAsync(provider);
        //            var response = Request.CreateResponse(HttpStatusCode.OK);
        //            foreach (var file in provider.Contents)
        //            {
        //                var dataStream = await file.ReadAsStreamAsync();
        //                // use the data stream to persist the data to the server (file system etc)
        //                var filePath = "";


        //                response.Content = new StringContent("Successful upload", Encoding.UTF8, "text/plain");
        //                response.Content.Headers.ContentType = new MediaTypeWithQualityHeaderValue(@"text/html");

        //            }
        //            return response;
        //        }
        //        catch (Exception e)
        //        {
        //            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
        //        }
        //    }


        //}

        

        
    }
}
