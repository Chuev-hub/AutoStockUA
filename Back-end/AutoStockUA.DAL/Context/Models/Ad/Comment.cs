using AutoStockUA.DAL.Context.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    [Serializable]
    public class Comment : IItem
    {
        [Key]
        public int Id { get; set; }
        public string Notation { get; set; }

        public int UserId { get; set; }
        public int AdvertisementId { get; set; }
        public virtual Advertisement Advertisement { get; set; }
        public virtual User User { get; set; }

    }
}
