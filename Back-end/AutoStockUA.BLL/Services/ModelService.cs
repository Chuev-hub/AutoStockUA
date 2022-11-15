using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Net;

namespace AutoStockUA.BLL.Services
{
    
    public class ModelService : GenericService<ModelDTO, Model>
    {
        public ModelService(AutoStockContext context) : base(context)
        {

        }
        public override async Task AddAsync(ModelDTO entity)
        {
            Model m = new Model()
            {
                Id = entity.Id,
                BrandId = entity.Brand.Id,
                Name = entity.Name

            };
            await Repository.AddAsync(m);
            await Repository.SaveChanges();
        }
    }
}
