using AutoStockUA.BLL.DTO.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.DTO.Ad
{
    [Serializable]
    public class AdvertisementDTO
    {
        public int Id { get; set; }
        public string CarManufactureYear { get; set; }
        public string CarStateNumber { get; set; }
        public double EngineLiters { get; set; }
        public string Mileage { get; set; }
        public string About { get; set; }
        public int OwnerCount { get; set; }
        public bool IsWanted { get; set; }
        public bool AllowToComent { get; set; }
        public bool IsActual { get; set; }
        public bool IsNew { get; set; }
        public bool WasCrushed { get; set; }
        public decimal Price { get; set; }

        public string Power { get; set; }
        public string VIN { get; set; }
        public string PriceСurrencyCode { get; set; }
        public DateTime Date { get; set; }
        public int Year { get; set; }

        public NumberOfPlacesDTO NumberOfPlaces { get; set; }
        public NumberOfDoorsDTO NumberOfDoors { get; set; }
        public ConditionTypeDTO ConditionType { get; set; }
        public CountryDTO Country { get; set; }
        public TypeDTO Type { get; set; }
        public RegionDTO Region { get; set; }
        public UserDTO Owner { get; set; }
        public DriveTypeDTO DriveType { get; set; }
        public GearboxTypeDTO GearboxType { get; set; }
        public BodyTypeDTO BodyType { get; set; }
        public ModelDTO Model { get; set; }
        public ColorDTO Color { get; set; }
        public EngineTypeDTO EngineType { get; set; }

        public IList<CommentDTO> Comments { get; set; }
        public IList<ImageDTO> Images { get; set; }

    }
}
