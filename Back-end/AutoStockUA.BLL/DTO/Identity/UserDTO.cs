using AutoStockUA.BLL.DTO.Ad;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AutoStockUA.BLL.DTO.Identity
{
    [Serializable]
    public class UserDTO
    {

        public virtual List<CommentDTO>? Comments { get; set; }
        public List<ChatDTO>? Chats { get; set; }
        public byte[]? Avatar { get; set; }

        public List<AdvertisementDTO>? Advertisements { get; set; }
        public IList<AdvertisementDTO>? Favourites { get; set; }

        public int? Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        [Required]
        public string Password { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
