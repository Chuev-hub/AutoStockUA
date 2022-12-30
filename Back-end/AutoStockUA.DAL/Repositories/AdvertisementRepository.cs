using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories
{
    public class AdvertisementRepository:GenericRepository<Advertisement>
    {
        public AdvertisementRepository(AutoStockContext c):base(c)
        {

        }
        public override async Task<IEnumerable<Advertisement>> GetAll(Expression<Func<Advertisement, bool>> expression)
        {
            return table
                .Include(x => x.Images)
                .Include(x => x.AccidentStatus)
                .Include(x => x.BodyType)
                .Include(x => x.Brand)
                .Include(x => x.Model)
                .Include(x => x.Color)
                .Include(x => x.Comments)
                .Include(x => x.ConditionType)
                .Include(x => x.Country)
                .Include(x => x.DriveType)
                .Include(x => x.EngineType)
                .Include(x => x.Favourites)
                .Include(x => x.NumberOfDoors)
                .Include(x => x.NumberOfPlaces)
               
              
                .Include(x => x.Region)
                .Where(expression).AsNoTracking();
        }
        
        public override async Task<Advertisement> GetAsync(Expression<Func<Advertisement, bool>> expression)
        {
            return (await table
                .Include(x => x.Images)
                .Include(x => x.AccidentStatus)
                .Include(x => x.BodyType)
                .Include(x => x.Brand)
                .Include(x => x.Model)
                .Include(x => x.Color)
                .Include(x => x.Comments)
                .Include(x => x.ConditionType)
                .Include(x => x.Country)
                .Include(x => x.DriveType)
                .Include(x => x.EngineType)
                .Include(x => x.Favourites)
                .Include(x => x.NumberOfDoors)
                .Include(x => x.NumberOfPlaces)
                .Include(x => x.Region).AsNoTracking()
                .FirstOrDefaultAsync(expression)); 
        }
    }
}
