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
    public class ChatDTO
    {
        [Key]
        public int Id { get; set; }
        public List<MessageDTO> Messages { get; set; }
        public List<UserDTO> Users { get; set; }
    }
}
