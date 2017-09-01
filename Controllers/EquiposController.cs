﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using simeAlcatraz.Models;


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
        public void Post(int id, string fieldName, int value)
        {
            myEntity.Database.ExecuteSqlCommand("UPDATE equipo SET [" + fieldName + "] = '" + value + "' WHERE equipoID = '" + id+"'");
            myEntity.SaveChanges();
        }

        

        
    }
}
