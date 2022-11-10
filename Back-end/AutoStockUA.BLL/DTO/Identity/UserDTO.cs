using AutoStockUA.BLL.DTO.Ad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AutoStockUA.BLL.DTO.Identity
{
    [Serializable]
    public class UserDTO
    {
        public virtual List<CommentDTO> Comments { get; set; }
        public List<ChatDTO> Chats { get; set; }
        public byte[] Avatar { get; set; }
        public List<AdvertisementDTO> Advertisements { get; set; }
        public IList<AdvertisementDTO> Favourites { get; set; }
    }
}
