using AutoStockUA.DAL.Context.Models.Identity;
using AutoStockUA.DAL.Context;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using AutoStockUA.BLL.Services;
using AutoMapper.Configuration.Conventions;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context.Models.Ad;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors]
    public class AdvertisementController : Controller
    {
        private AutoStockContext _context;
        private OptionsService _optionsService;
        private AdvertisementService _advertisementService;

        public AdvertisementController(AutoStockContext context, OptionsService optionsService, AdvertisementService advertisementService)
        {
            _context = context;
            _optionsService = optionsService;
            _advertisementService = advertisementService;
        }

        public async Task<IActionResult> Get()
        {
            return Ok();
        }
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }
        public async Task<IActionResult> Post([FromBody]AdvertisementDTO advertisement)
        {
            return Ok();
        }
        public async Task<IActionResult> Put([FromBody] AdvertisementDTO advertisement)
        {
            return Ok();
        }
        public async Task<IActionResult> Delete(int id)
        {
            return Ok();
        }
        public async Task<IActionResult> GetOptions()
        {
            return Json(new {
                NumberOfPlaces= await _optionsService.NumberOfPlaces.GetAllAsync(x=>true),
                NumberOfDoors = await _optionsService.NumberOfDoors.GetAllAsync(x=>true),
                AccidentStatus = await _optionsService.AccidentStatus.GetAllAsync(x=>true),
                BodyType = await _optionsService.BodyType.GetAllAsync(x=>true),
                Brand = await _optionsService.Brand.GetAllAsync(x=>true),
                Color = await _optionsService.Color.GetAllAsync(x=>true),
                ConditionType = await _optionsService.ConditionType.GetAllAsync(x=>true),
                Country = await _optionsService.Country.GetAllAsync(x=>true),
                DriveType = await _optionsService.DriveType.GetAllAsync(x=>true),
                EngineType = await _optionsService.EngineType.GetAllAsync(x=>true),
                GearboxType = await _optionsService.GearboxType.GetAllAsync(x=>true),
                Model = await _optionsService.Model.GetAllAsync(x=>true),
                Region = await _optionsService.Region.GetAllAsync(x=>true),
                Type = await _optionsService.Type.GetAllAsync(x=>true),
        });
        }
    }
}
