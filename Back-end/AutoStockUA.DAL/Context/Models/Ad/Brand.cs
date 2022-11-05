using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    [Serializable]
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Model> Models { get; set; }

        public List<Advertisement> Advertisements { get; set; }
    }
}
