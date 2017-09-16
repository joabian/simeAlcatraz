using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using simeAlcatraz.Models;
using System.IO;
using System.Drawing;


namespace simeAlcatraz.Controllers
{
    public class EquiposViewController : Controller
    {
        private sime_dbEntities myEntity = new sime_dbEntities();

        //
        // GET: /EquiposView/
        public ActionResult agregarEquipo()
        {
            ViewBag.IsProdSave = false;
            ViewBag.Categories = myEntity.categorias;
            var model = new equipo();
            return View(model);
        }

        public ActionResult verInventario()
        {
            return PartialView("~/Views/EquiposView/verInventario.cshtml");
        }

        public ActionResult updateEquipo()
        {
            return View();
        }
        
        public ActionResult caracteriticasEspeciales()
        {
            return View();
        }


        //Action result for ajax call
        [HttpPost]
        public ActionResult GetSubsbyCategoriaID(int categoID)
        {
            List<subcategoria> objcity = new List<subcategoria>();
            objcity = GetAllSubcategorias().Where(m => m.categoriaID == categoID).ToList();
            SelectList obgcity = new SelectList(objcity, "subcategoriaID", "nombre", 0);
            return Json(obgcity);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult agregarEquipo(equipo equipo)
        {
            ViewBag.IsProdSave = false;
            if (ModelState.IsValid)
            {

                if (equipo.serializado != true) { equipo.serializado = false; }

                var eq = new equipo();
                eq.descripcion = equipo.descripcion;
                eq.fechaIngreso = DateTime.Now;
                eq.id_categoria = equipo.id_categoria;
                eq.id_subcategoria = equipo.id_subcategoria;
                eq.activo = true;
                eq.marcaEquipo = equipo.marcaEquipo;
                eq.nombreEquipo = equipo.nombreEquipo;
                eq.modeloEquipo = equipo.modeloEquipo;
                eq.serializado = equipo.serializado;
                eq.numeroSerie = equipo.numeroSerie;
                eq.fechaModifico = DateTime.Now;
                eq.areaStatus = false;
                eq.hasCheckList = false;
                eq.periodoServ = false;
                eq.periodoServNum = 0;

                myEntity.equipoes.Add(eq);
                myEntity.SaveChanges();
                var id = eq.equipoID;

                var imageTypes = new string[]{    
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (equipo.ImageUpload == null || equipo.ImageUpload.ContentLength == 0)
                {
                    //ModelState.AddModelError("ImageUpload", "This field is required");
                }
                else if (!imageTypes.Contains(equipo.ImageUpload.ContentType))
                {
                    ModelState.AddModelError("ImageUpload", "Solo puede ingresar imagenes GIF, JPG o PNG.");
                }
                else
                {
                    // Save image to folder and get path
                    var imageName = String.Format("{0:yyyyMMdd-HHmmss}", DateTime.Now);
                    var extension = System.IO.Path.GetExtension(equipo.ImageUpload.FileName).ToLower();
                    using (var img = System.Drawing.Image.FromStream(equipo.ImageUpload.InputStream))
                    {
                        var pathToSave = String.Format("/Images/Equipos/{0}{1}", imageName, extension);
                        var pathToSaveThumb = String.Format("/Images/Equipos/{0}_thumb{1}", imageName, extension);

                        // Save large size image, 600 x 600
                        SaveToFolder(img, extension, new Size(1000, 1000), pathToSave);
                        // Save Thumb
                        SaveToFolder(img, extension, new Size(100, 100), pathToSaveThumb);

                        var ft = new foto();
                        ft.activo = true;
                        ft.id_equipo = id;
                        ft.url = pathToSave;
                        ft.fcreo = DateTime.Now;
                        ft.fmodifico = DateTime.Now;
                        myEntity.fotos.Add(ft);
                        myEntity.SaveChanges();

                    }

                }

                ViewBag.IsProdSave = true;
            }

            ViewBag.Categories = myEntity.categorias;
            return View();
        }

        public List<subcategoria> GetAllSubcategorias()
        {
            List<subcategoria> subCategos = (from records in myEntity.subcategorias select records).ToList();
            return subCategos;
        }

        private void SaveToFolder(Image img, string extension, Size newSize, string pathToSave)
        {
            // Get new resolution
            Size imgSize = NewImageSize(img.Size, newSize);
            using (System.Drawing.Image newImg = new Bitmap(img, imgSize.Width, imgSize.Height))
            {
                newImg.Save(Server.MapPath(pathToSave), img.RawFormat);
            }
        }

        public Size NewImageSize(Size imageSize, Size newSize)
        {
            Size finalSize;
            double tempval;
            if (imageSize.Height > newSize.Height || imageSize.Width > newSize.Width)
            {
                if (imageSize.Height > imageSize.Width)
                    tempval = newSize.Height / (imageSize.Height * 1.0);
                else
                    tempval = newSize.Width / (imageSize.Width * 1.0);

                finalSize = new Size((int)(tempval * imageSize.Width), (int)(tempval * imageSize.Height));
            }
            else
                finalSize = imageSize; // image is already small size

            return finalSize;
        }

        //public ActionResult agregarEquipo2()
        //{
        //    equipo objEquipoModel = new equipo();
        //    objEquipoModel.categoriaModel = new List<categoria>();
        //    objEquipoModel.categoriaModel = GetAllCategorias();

        //    return View(objEquipoModel);
        //}

        //public List<categoria> GetAllCategorias()
        //{

        //    List<categoria> categos = (from records in myEntity.categorias select records).ToList();
        //    return categos;
        //}

    }
}