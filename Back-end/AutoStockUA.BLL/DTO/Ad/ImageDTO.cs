using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.DTO.Ad
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public byte[] ImageData { get; set; }
    }
}
