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
    
    public partial class area
    {
        public int areaID { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public Nullable<int> idSucursal { get; set; }
        public Nullable<int> usuarioEncargado { get; set; }
        public Nullable<bool> activo { get; set; }
        public Nullable<System.DateTime> fechaIngreso { get; set; }
    }
}
