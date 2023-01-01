using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories
{
    public class OptionsSort
    {
        public double? EngLFr { get; set; }//EngineLitersFrom
        public double? EngLTo { get; set; }//EngineLitersTo
        public string? MlgFr { get; set; }//MileageFrom
        public string? MlgTo { get; set; }//MileageTo
        public int? OwnCtFr { get; set; }//OwnerCountFrom
        public int? OwnCtTo { get; set; }//OwnerCountTo
        public bool? New { get; set; }//IsNew
        public decimal? PrcFr { get; set; }//PriceFrom
        public decimal? PrcTo { get; set; }//PriceTo
        public string? PwrFr { get; set; }//PowerFrom
        public string? PwrTo { get; set; }//PowerTo
        public int? YrFr { get; set; }//YearFrom
        public int? YrTo { get; set; }//YearTo
        public int? Rgn { get; set; }//Region
        public int? Mdl { get; set; }//Model
        public int? Clr { get; set; }//Color
        public int? AcdtSt { get; set; }//AccidentStatus
        public int? EngTp { get; set; }//EngineType
        public int? GrbxTp { get; set; }//GearboxType
        public int? DrvTp { get; set; }//DriveType
        public int? Cntr { get; set; }//Country
        public int? Nod { get; set; }//NumberOfDoors
        public int? Nop { get; set; }//NumberOfPlaces
        public int? BdTp { get; set; }// BodyType
        public int? Brnd { get; set; }//Brand
        public int? CndtnTp { get; set; }//conditionType
        public string? sort { get; set; }//
        public int? page { get; set; }//

    }

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
        public override async Task<IEnumerable<Advertisement>> GetAll(OptionsSort options,int skip,int take,string sort)
        {
            
                IQueryable<Advertisement> t = table
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
                  .Include(x => x.Region);
                if (options.Nod != null)
                    t = t.Where(x => x.NumberOfDoorsId == options.Nod);
                if (options.Nop != null )
                    t = t.Where(x => x.NumberOfPlacesId == options.Nop);
                if (options.Rgn != null )
                    t = t.Where(x => x.RegionId == options.Rgn);
                if (options.Clr != null )
                    t = t.Where(x => x.ColorId == options.Clr);
                if (options.AcdtSt != null )
                    t = t.Where(x => x.AccidentStatusId == options.AcdtSt);
                if (options.EngTp != null)
                    t = t.Where(x => x.EngineTypeId == options.EngTp);
                if (options.GrbxTp != null )
                    t = t.Where(x => x.GearboxTypeId == options.GrbxTp);
                if (options.DrvTp != null )
                    t = t.Where(x => x.DriveTypeId == options.DrvTp);
                if (options.BdTp != null)
                    t = t.Where(x => x.BodyTypeId == options.BdTp);
                if (options.CndtnTp != null )
                    t = t.Where(x => x.ConditionTypeId == options.CndtnTp);
                if (options.Brnd != null)
                {
                    t = t.Where(x => x.BrandId == options.Brnd);
                    if (options.Mdl != null )
                        t = t.Where(x => x.ModelId == options.Mdl);
                }
                if (options.EngLFr != null)
                    t = t.Where(x => x.EngineLiters >= options.EngLFr && x.EngineLiters <= options.EngLTo);
                
                
                if (options.MlgFr != null)
                    t = t.Where(x => Convert.ToInt32(x.Mileage) > Convert.ToInt32(options.MlgFr) && Convert.ToInt32(x.Mileage) < Convert.ToInt32(options.MlgTo));

                if (options.OwnCtFr != null)
                    t = t.Where(x => x.OwnerCount >= options.OwnCtFr && x.OwnerCount <= options.OwnCtTo);

                if (options.PrcFr != null)
                    t = t.Where(x => x.Price >= options.PrcFr && x.Price <= options.PrcTo);

                if (options.PwrFr != null)
                    t = t.Where(x => Convert.ToInt32(x.Power) >= Convert.ToInt32(options.PwrFr) && Convert.ToInt32(x.Power) <= Convert.ToInt32(options.PwrTo));

                if (options.YrFr != null)
                    t = t.Where(x => x.Year >= options.YrFr && x.Year <= options.YrTo);

                if (options.New != null )
                    t = t.Where(x => x.IsNew==options.New);


                if (sort == "Новіші") return t.OrderByDescending(x => x.Date).Skip(skip).Take(take).AsNoTracking();
            if (sort == "Старіші") return t.OrderBy(x => x.Date).Skip(skip).Take(take).AsNoTracking();
            if (sort == "За зростанням ціни") return t.OrderBy(x => x.Price).Skip(skip).Take(take).AsNoTracking();
            if (sort == "За спаданням ціни") return t.OrderByDescending(x => x.Price).Skip(skip).Take(take).AsNoTracking();
            return   t.OrderByDescending(x => x.Date).Skip(skip).Take(take).AsNoTracking();
          
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
