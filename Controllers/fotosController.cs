﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
//using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
//using System.Data.Entity;
using simeAlcatraz.Extensions;
using simeAlcatraz.Models;

namespace simeAlcatraz.Controllers
{
    public class fotosController : ApiController
    {
        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Uploads";
        
        private sime_dbEntities myEntity = new sime_dbEntities();


        public async Task<IHttpActionResult> Get()
        {
            var photos = new List<PhotoViewModel>();

            var photoFolder = new DirectoryInfo(workingFolder);
            await Task.Factory.StartNew(() =>
            {
                photos = photoFolder.EnumerateFiles()
                    .Where(fi => new[] { ".jpeg", ".jpg", ".bmp", ".png", ".gif", ".tiff" }
                        .Contains(fi.Extension.ToLower()))
                    .Select(fi => new PhotoViewModel
                    {
                        Name = fi.Name,
                        Created = fi.CreationTime,
                        Modified = fi.LastWriteTime,
                        Size = fi.Length / 1024
                    })
                    .ToList();
            });

            return Ok(new { Photos = photos });

        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string fileName)
        {
            if (!FileExists(fileName))
            {
                return NotFound();
            }

            try
            {
                var filePath = Directory.GetFiles(workingFolder, fileName)
                    .FirstOrDefault();

                await Task.Factory.StartNew(() =>
                {
                    if (filePath != null)
                        File.Delete(filePath);
                });

                var result = new PhotoActionResult
                {
                    Successful = true,
                    Message = fileName + "deleted successfully"
                };
                return Ok(new { message = result.Message });
            }
            catch (Exception ex)
            {
                var result = new PhotoActionResult
                {
                    Successful = false,
                    Message = "error deleting fileName " + ex.GetBaseException().Message
                };
                return BadRequest(result.Message);
            }
        }

        /// <summary>
        ///   Add a photo
        /// </summary>
        /// <returns></returns>
        public async Task<IHttpActionResult> Add()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }
            try
            {
                var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
                //await Request.Content.ReadAsMultipartAsync(provider);
                await Task.Run(async () => await Request.Content.ReadAsMultipartAsync(provider));

                var photos = new List<PhotoViewModel>();

                foreach (var file in provider.FileData)
                {
                    var fileInfo = new FileInfo(file.LocalFileName);

                    photos.Add(new PhotoViewModel
                    {
                        Name = fileInfo.Name,
                        Created = fileInfo.CreationTime,
                        Modified = fileInfo.LastWriteTime,
                        Size = fileInfo.Length / 1024
                    });
                }
                return Ok(new { Message = "Photos uploaded ok", Photos = photos });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }

        /// <summary>
        ///   Check if file exists on disk
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public bool FileExists(string fileName)
        {
            var file = Directory.GetFiles(workingFolder, fileName)
                .FirstOrDefault();

            return file != null;
        }


        // GET api/fotos
        //public IEnumerable<foto> Get()
        //{
        //    return myEntity.fotos.AsEnumerable();
        //}

        // GET api/fotos/5
        //public foto Get(int id)
        //{
        //    foto ft = myEntity.fotos.Find(id);
        //    return ft;

        //}

        // POST api/fotos
        //public void Post(foto ft)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        myEntity.fotos.Add(ft);
        //        myEntity.SaveChanges();
        //    }
        //}

        // PUT api/fotos/5
        //public void Put(foto ft)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        myEntity.Entry(ft).State = EntityState.Modified;
        //        try
        //        {
        //            myEntity.SaveChanges();
        //        }
        //        catch (Exception)
        //        {
        //            throw;
        //        }
        //    }
        //}

        // DELETE api/fotos/5
        //public void Delete(int id)
        //{
        //    foto dlt = myEntity.fotos.Find(id);
        //    if (dlt != null)
        //    {
        //        try
        //        {
        //            myEntity.fotos.Remove(dlt);
        //            myEntity.SaveChanges();
        //        }
        //        catch (Exception)
        //        {
        //            throw;
        //        }
        //    }

        //}
    }
}
