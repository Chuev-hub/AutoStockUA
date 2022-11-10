using AutoStockUA.DAL.Context.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    public class Favourites
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int AdvertisementId { get; set; }
        public Advertisement Advertisement { get; set; }
    }
}
