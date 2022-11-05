using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DriveType = AutoStockUA.DAL.Context.Models.Ad.DriveType;
namespace AutoStockUA.DAL.Repositories.Ad
{
    public class DriveTypeRepository : GenericRepository<DriveType>
    {
        public DriveTypeRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
