using AutoStockUA.DAL.Context.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Context.Models.Ad
{
    [Serializable]
    public class Advertisement : IItem
    {
        [Key]
        public int Id { get; set; }
        public string CarStateNumber { get; set; }
        public double EngineLiters { get; set; }
        public string Mileage { get; set; }
        public string About { get; set; }
        public int OwnerCount { get; set; }
        public bool AllowToComent { get; set; }
        public bool IsActual { get; set; }
        public bool IsNew { get; set; }
        public decimal Price { get; set; }

        public string Power { get; set; }
        public string VIN { get; set; }
        public string PriceСurrencyCode { get; set; }
        public DateTime Date { get; set; }
        public int Year { get; set; }

        public int RegionId { get; set; }
        public int OwnerId { get; set; }
        public int ModelId { get; set; }
        public int ColorId { get; set; }
        public int AccidentStatusId { get; set; }
        public int EngineTypeId { get; set; }
        public int GearboxTypeId { get; set; }
        public int DriveTypeId { get; set; }
        public int CountryId { get; set; }
        public int ConditionTypeId { get; set; }
        public int NumberOfDoorsId { get; set; }
        public int NumberOfPlacesId { get; set; }
        public int BodyTypeId { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }


        public NumberOfPlaces NumberOfPlaces { get; set; }
        public NumberOfDoors NumberOfDoors { get; set; }
        public ConditionType ConditionType { get; set; }
        public AccidentStatus AccidentStatus { get; set; }
        public Country Country { get; set; }
        public Region Region { get; set; }
        public User Owner { get; set; }
        public DriveType DriveType { get; set; }
        public GearboxType GearboxType { get; set; }
        public BodyType BodyType { get; set; }
        public Model Model { get; set; }
        public Color Color { get; set; }
        public EngineType EngineType { get; set; }

        public IList<Favourites> Favourites { get; set; }
        public IList<Comment> Comments { get; set; }
        public IList<Image> Images { get; set; }

    }
}
