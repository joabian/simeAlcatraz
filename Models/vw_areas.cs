//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace simeAlcatraz.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class vw_areas
    {
        public int areaID { get; set; }
        public string nombreArea { get; set; }
        public string descripcion { get; set; }
        public string nombreSucursal { get; set; }
        public string nombreEncargado { get; set; }
        public Nullable<bool> activo { get; set; }
        public Nullable<System.DateTime> fechaIngreso { get; set; }
    }
}
