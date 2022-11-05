using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Image = AutoStockUA.DAL.Context.Models.Ad.Image;
namespace AutoStockUA.DAL.Repositories.Ad
{
    public class ImageRepository : GenericRepository<Image>
    {
        public ImageRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
