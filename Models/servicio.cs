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
    
    public partial class servicio
    {
        public int servicioID { get; set; }
        public Nullable<int> idAreaStock { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
        public Nullable<int> idUsuario { get; set; }
        public Nullable<bool> atendido { get; set; }
        public Nullable<int> idChecklist { get; set; }
        public Nullable<bool> activo { get; set; }
    }
}
