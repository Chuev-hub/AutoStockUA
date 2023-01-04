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
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.CSharp;
using AutoStockUA.DAL.Context.Models;
using Microsoft.CodeAnalysis;
using AutoStockUA.DAL.Repositories;

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
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] OptionsSort options)
        {
            if(options != null)
            {

               return Json(
                   new
                   {
                       cars = await _advertisementService.GetAllAsync(options
               , options.page != null ? (int)options.page : 0, options.sort != null ? options.sort : "Новіші"),
                       pages = await _advertisementService.GetCountAsync(options),
                   });

            }
            return Ok();
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            return Json(await _advertisementService.Get(x=>x.Id==id));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Post([FromBody] AdvertisementDTO advertisement)
        {
            try
            {
            
            if (advertisement.CarStateNumber != "")
            {
                var all = await _advertisementService.GetAllAsync(x => x.CarStateNumber == advertisement.CarStateNumber);
                if (all.Count() > 0)
                    return BadRequest(new[] { "Car state number is already registered" });
            }
            if (advertisement.VIN != "")
            {
                var all = await _advertisementService.GetAllAsync(x => x.VIN == advertisement.VIN);
                if (all.Count() > 0)
                    return BadRequest(new[] { "VIN is already registered" });
            }

            await _advertisementService.AddAsync(advertisement);
           
            return Ok();
            }catch(Exception e)
            {
                return Ok();

            }
        }
        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Put([FromBody] AdvertisementDTO advertisement)
        {
            await _advertisementService.UpdateAsync(advertisement);
            return Ok();
        }
        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Delete( int id)
        {
            await _advertisementService.RemoveAtAsync(x => x.Id == id);
            return Ok();
        }
        [HttpPut]
        [Route("{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Active( int id)
        {
            try
            {

            var item = (await _advertisementService.Get(x => x.Id == id));
            if(item == null)
                return BadRequest(300);

            item.IsActual = !item.IsActual;
            await _advertisementService.UpdateAsync(item);
            }
                catch(Exception e)
            {
                return Ok();
            }
            return Ok();
        }
        public async Task<IActionResult> GetOptions()
        {
            return Json(new
            {
                NumberOfPlaces = await _optionsService.NumberOfPlaces.GetAllAsync(x => true),
                NumberOfDoors = await _optionsService.NumberOfDoors.GetAllAsync(x => true),
                AccidentStatus = await _optionsService.AccidentStatus.GetAllAsync(x => true),
                BodyType = await _optionsService.BodyType.GetAllAsync(x => true),
                Brand = await _optionsService.Brand.GetAllAsync(x => true),
                Color = await _optionsService.Color.GetAllAsync(x => true),
                ConditionType = await _optionsService.ConditionType.GetAllAsync(x => true),
                Country = await _optionsService.Country.GetAllAsync(x => true),
                DriveType = await _optionsService.DriveType.GetAllAsync(x => true),
                EngineType = await _optionsService.EngineType.GetAllAsync(x => true),
                GearboxType = await _optionsService.GearboxType.GetAllAsync(x => true),
                Region = await _optionsService.Region.GetAllAsync(x => true),
            });
        }
        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetModels(int id)
        {
            return Json(
               await _optionsService.Model.GetAllAsync(x => x.BrandId == id)
           );
        }
    }
}
