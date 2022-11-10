using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.Services
{
    public class AdvertisementService : GenericService<AdvertisementDTO, Advertisement>
    {
        public AdvertisementService(AutoStockContext context):base(context)
        {

        }
    }
}
