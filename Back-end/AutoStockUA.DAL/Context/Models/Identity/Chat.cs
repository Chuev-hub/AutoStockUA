using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Identity
{
    [Serializable]
    public class Chat
    {
        [Key]
        public int Id { get; set; }
        public List<Message> Messages { get; set; }
        public List<User> Users { get; set; }
    }
}
