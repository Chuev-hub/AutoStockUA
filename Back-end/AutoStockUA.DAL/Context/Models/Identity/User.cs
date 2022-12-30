using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AutoStockUA.DAL.Context.Models.Identity
{
    [Serializable]
    public class User : IdentityUser<int>, IItem
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }
        public virtual List<Message>? Messages { get; set; }
        public virtual List<Comment>? Comments { get; set; }
        public ICollection<Chat>? Chats { get; set; }
        public string? Avatar { get; set; }
        public List<Advertisement>? Advertisements { get; set; }
        public IList<Favourites>? Favourites { get; set; }
    }
}
