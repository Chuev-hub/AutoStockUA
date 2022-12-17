using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DriveType = AutoStockUA.DAL.Context.Models.Ad.DriveType;
 

namespace AutoStockUA.BLL.Services
{
    public class OptionsService
    {
        public GenericService<NumberOfPlacesDTO, NumberOfPlaces> NumberOfPlaces;
        public GenericService<NumberOfDoorsDTO, NumberOfDoors> NumberOfDoors;
        public GenericService<ConditionTypeDTO, ConditionType> ConditionType;
        public GenericService<CountryDTO, Country> Country;
        public GenericService<RegionDTO, Region> Region;
        public GenericService<DriveTypeDTO, DriveType> DriveType;
        public GenericService<GearboxTypeDTO, GearboxType> GearboxType;
        public GenericService<BodyTypeDTO, BodyType> BodyType;
        public ModelService Model;
        public GenericService<ColorDTO, Color> Color;
        public GenericService<EngineTypeDTO, EngineType> EngineType;
        public GenericService<AccidentStatusDTO, AccidentStatus> AccidentStatus;
        public GenericService<BrandDTO, Brand> Brand;
        public OptionsService(AutoStockContext context)
        {
            NumberOfPlaces = new GenericService<NumberOfPlacesDTO, NumberOfPlaces>(context);
            NumberOfDoors = new GenericService<NumberOfDoorsDTO, NumberOfDoors>(context);
            ConditionType = new GenericService<ConditionTypeDTO, ConditionType>(context);
            Country = new GenericService<CountryDTO, Country>(context);
            Region = new GenericService<RegionDTO, Region>(context);
            DriveType = new GenericService<DriveTypeDTO, DriveType>(context);
            GearboxType = new GenericService<GearboxTypeDTO, GearboxType>(context);
            BodyType = new GenericService<BodyTypeDTO, BodyType>(context);
            Model = new ModelService(context);
            Color = new GenericService<ColorDTO, Color>(context);
            EngineType = new GenericService<EngineTypeDTO, EngineType>(context);
            AccidentStatus = new GenericService<AccidentStatusDTO, AccidentStatus>(context);
            Brand = new GenericService<BrandDTO, Brand>(context);

        }

    }
}
