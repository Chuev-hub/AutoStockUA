using AutoMapper;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context.Models.Identity;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using DriveType = AutoStockUA.DAL.Context.Models.Ad.DriveType;
using Image = AutoStockUA.DAL.Context.Models.Ad.Image;

namespace AutoStockUA.BLL.Services
{
    public class AdvertisementService : GenericService<AdvertisementDTO, Advertisement>
    {
        private readonly IMapper MapperImage;
        private readonly GenericRepository<Image> _imageRepository;
        
        public AdvertisementService(AutoStockContext context):base(context)
        {
            MapperConfiguration config1 = new MapperConfiguration(con =>
            {
                con.CreateMap<ImageDTO, Image>().ReverseMap();
            });
            MapperImage = new Mapper(config1);
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<AdvertisementDTO, Advertisement>().ReverseMap();
                con.CreateMap<AccidentStatusDTO, AccidentStatus>().ReverseMap();
                con.CreateMap<NumberOfPlacesDTO, NumberOfPlaces>().ReverseMap();
                con.CreateMap<NumberOfDoorsDTO, NumberOfDoors>().ReverseMap();
                con.CreateMap<ConditionTypeDTO, ConditionType>().ReverseMap();
                con.CreateMap<CountryDTO, Country>().ReverseMap();
                con.CreateMap<ImageDTO, Image>().ReverseMap();
                con.CreateMap<RegionDTO, Region>().ReverseMap();
                con.CreateMap<DriveTypeDTO, DriveType>().ReverseMap();
                con.CreateMap<GearboxTypeDTO, GearboxType>().ReverseMap();
                con.CreateMap<BodyTypeDTO, BodyType>().ReverseMap();
                con.CreateMap<ModelDTO,Model>().ReverseMap();
                con.CreateMap<ColorDTO, Color>().ReverseMap();
                con.CreateMap<EngineTypeDTO, EngineType>().ReverseMap();
                con.CreateMap<AccidentStatusDTO, AccidentStatus>().ReverseMap();
                con.CreateMap<BrandDTO, Brand>().ReverseMap();
                con.CreateMap<UserDTO, User>().ReverseMap();
                con.CreateMap<CommentDTO, Comment>().ReverseMap();
    });
            Mapper = new Mapper(config);
            _imageRepository = new GenericRepository<Image>(context);
            Repository = new AdvertisementRepository(context);
        }
        public override async Task UpdateAsync(AdvertisementDTO entity)
        {
            var entity2 = new Advertisement()
            {
                Id = entity.Id,
                CarStateNumber = entity.CarStateNumber,
                About = entity.About,
                AllowToComent = entity.AllowToComent,
                Date = entity.Date,
                Year = entity.Year,
                VIN = entity.VIN,
                PriceСurrencyCode = entity.PriceСurrencyCode,
                Price = entity.Price,
                Power = (entity.Power),
                OwnerCount = entity.OwnerCount,
                IsActual = entity.IsActual,
                IsNew = entity.IsNew,
                Mileage = (entity.Mileage),
                EngineLiters = (entity.EngineLiters),
                OwnerId = (int)entity.Owner.Id,
                BodyTypeId = entity.BodyType.Id,
                DriveTypeId = entity.DriveType.Id,
                NumberOfDoorsId = entity.NumberOfDoors.Id,
                NumberOfPlacesId = entity.NumberOfPlaces.Id,
                ColorId = entity.Color.Id,
                ConditionTypeId = entity.ConditionType.Id,
                CountryId = entity.Country.Id,
                EngineTypeId = entity.EngineType.Id,
                GearboxTypeId = entity.GearboxType.Id,
                ModelId = entity.Model.Id,
                RegionId = entity.Region.Id,
                AccidentStatusId = entity.AccidentStatus.Id,
                BrandId = entity.Model.Brand.Id
            };
            await Repository.UpdateAsync(entity2);
            await Repository.SaveChanges();
        }
        public override async Task<IEnumerable<AdvertisementDTO>> GetAllAsync(Expression<Func<Advertisement, bool>> expression)
        {
            List<Advertisement> list = new List<Advertisement>(await Repository.GetAll(expression));
            var res = Mapper.Map<IEnumerable<Advertisement>, IEnumerable<AdvertisementDTO>>(list);
            return res;
        }
        public override async Task AddAsync(AdvertisementDTO entity)
        {
            Advertisement data = new Advertisement()
            {
                CarStateNumber = entity.CarStateNumber,
                About = entity.About,
                AllowToComent = entity.AllowToComent,
                Date = entity.Date,
                Year = entity.Year,
                VIN = entity.VIN,
                PriceСurrencyCode = entity.PriceСurrencyCode,
                Price = entity.Price,
                Power = (entity.Power),
                OwnerCount = entity.OwnerCount,
                IsActual = entity.IsActual,
                IsNew = entity.IsNew,
                Mileage = (entity.Mileage),
                EngineLiters = (entity.EngineLiters),
                OwnerId = (int)entity.Owner.Id,
                BodyTypeId = entity.BodyType.Id,
                DriveTypeId = entity.DriveType.Id,
                NumberOfDoorsId = entity.NumberOfDoors.Id,
                NumberOfPlacesId = entity.NumberOfPlaces.Id,
                ColorId = entity.Color.Id,
                ConditionTypeId = entity.ConditionType.Id,
                CountryId = entity.Country.Id,
                EngineTypeId = entity.EngineType.Id,
                GearboxTypeId = entity.GearboxType.Id,
                ModelId = entity.Model.Id,
                RegionId = entity.Region.Id,
                AccidentStatusId = entity.AccidentStatus.Id,
                BrandId = entity.Model.Brand.Id


            };
            int id = await Repository.AddAsync(data);
            var Images = new List<Image>(MapperImage.Map<List<ImageDTO>, List<Image>>(entity.Images.ToList()));
            await _imageRepository.AddRangeAsync(Images.Select((x) => { x.AdvertisementId = id; return x; }));
            await Repository.SaveChanges();
        }
    }
}
