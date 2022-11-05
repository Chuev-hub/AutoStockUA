using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Identity
{
    [Serializable]
    public class User : IdentityUser<int>
    {
        public virtual List<Message> Messages { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public List<Chat> Chats { get; set; }
        public List<Advertisement> Advertisements { get; set; }
        public IList<Favourites> Favourites { get; set; }

    }
}
