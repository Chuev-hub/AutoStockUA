using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.DTO.Identity
{
    [Serializable]
    public class MessageDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public UserDTO User { get; set; }
        public DateTime Date { get; set; }
    }
}
