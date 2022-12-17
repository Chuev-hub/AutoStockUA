using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    [Serializable]
    public class Model : IItem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Brand")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int BrandId { get; set; }
        public Brand Brand { get; set; }

    }
}
