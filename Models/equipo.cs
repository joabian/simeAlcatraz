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
    
    public partial class equipo
    {
        public int equipoID { get; set; }
        public string descripcion { get; set; }
        public Nullable<System.DateTime> fechaIngreso { get; set; }
        public Nullable<int> id_categoria { get; set; }
        public Nullable<int> id_subcategoria { get; set; }
        public Nullable<bool> activo { get; set; }
        public string marcaEquipo { get; set; }
        public string nombreEquipo { get; set; }
        public string modeloEquipo { get; set; }
        public Nullable<bool> serializado { get; set; }
        public string numeroSerie { get; set; }
        public Nullable<System.DateTime> fechaModifico { get; set; }
        public string userModifico { get; set; }
        public string userCaptura { get; set; }
        public Nullable<bool> areaStatus { get; set; }
        public Nullable<bool> hasCheckList { get; set; }
        public Nullable<bool> periodoServ { get; set; }
        public Nullable<int> periodoServNum { get; set; }
    }
}
