using AutoStockUA.BLL.DTO.Identity;
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
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Notation { get; set; }

        public virtual UserDTO User { get; set; }

    }
}
