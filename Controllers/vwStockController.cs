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
    public class vwStockController : ApiController
    {

        private sime_dbEntities myEntity = new sime_dbEntities();

        // GET api/vwstock
        public IEnumerable<vw_stock> Get()
        {
            return myEntity.vw_stock.AsEnumerable();
        }

        // GET api/vwstock/GetBySucursalName/name
        public IEnumerable<vw_stock> GetBySucursalName(string name)
        {
            var query = from mysub in myEntity.vw_stock.AsEnumerable()
                        where mysub.sucursal == name
                        select mysub;
            return query;
        }

        // GET api/vwstock/GetByCategoriaID/5
        public IEnumerable<vw_stock> GetByCategoriaID(int id)
        {
            var query = from mysub in myEntity.vw_stock.AsEnumerable()
                        where mysub.id_categoria == id
                        select mysub;
            return query;
        }

        // GET api/vwstock/GetBySubcategoriaID/5
        public IEnumerable<vw_stock> GetBySubcategoriaID(int id)
        {
            var query = from mysub in myEntity.vw_stock.AsEnumerable()
                        where mysub.id_subcategoria == id
                        select mysub;
            return query;
        }
    }
}
