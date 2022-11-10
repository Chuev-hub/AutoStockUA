using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.DTO.Ad
{
    [Serializable]
    public class ModelDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public BrandDTO Brand { get; set; }

    }
}
