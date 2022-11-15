using AutoMapper.Execution;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq.Expressions;
using Type = System.Type;

namespace AutoStockUA.API.Controllers
{
    [Authorize(Roles = "admin")]
    public class ConfigureController : Controller
    {
        public OptionsService OptionsService { get; set; }
        public GenericService<BrandDTO, Brand> BrandService { get; set; }
        public ConfigureController(OptionsService op, GenericService<BrandDTO, Brand> service)
        {
            BrandService = service;
            OptionsService = op;
        }
        [HttpPost]
        public async Task<ActionResult> Add(string name, string type)
        {
            try
            {
                switch (type)
                {
                    case "Accident status":
                        await OptionsService.AccidentStatus.AddAsync(new AccidentStatusDTO() { Name = name });
                        break;
                    case " Body type ":
                        await OptionsService.BodyType.AddAsync(new BodyTypeDTO() { Name = name });
                        break;
                    case "Brand":
                        await OptionsService.Brand.AddAsync(new BrandDTO() { Name = name });
                        break;
                    case "Color":
                        await OptionsService.Color.AddAsync(new ColorDTO() { Name = name });
                        break;
                    case "Condition type ":
                        await OptionsService.ConditionType.AddAsync(new ConditionTypeDTO() { Name = name });
                        break;
                    case "Country":
                        await OptionsService.Country.AddAsync(new CountryDTO() { Name = name });
                        break;
                    case "Drive type ":
                        await OptionsService.DriveType.AddAsync(new DriveTypeDTO() { Name = name });
                        break;
                    case "Engine type ":
                        await OptionsService.EngineType.AddAsync(new EngineTypeDTO() { Name = name });
                        break;
                    case "Gearbox type ":
                        await OptionsService.GearboxType.AddAsync(new GearboxTypeDTO() { Name = name });
                        break;
                    case "Number of doors":
                        await OptionsService.NumberOfDoors.AddAsync(new NumberOfDoorsDTO() { Name = name });
                        break;
                    case "Number of places":
                        await OptionsService.NumberOfPlaces.AddAsync(new NumberOfPlacesDTO() { Name = name });
                        break;
                    case "Region ":
                        await OptionsService.Region.AddAsync(new RegionDTO() { Name = name });
                        break;
                    case "Type":
                        await OptionsService.Type.AddAsync(new TypeDTO() { Name = name });
                        break;
                }

                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                TempData["ErrorMessage"] = e.InnerException.Message;
                return RedirectToAction("Index");
            }

        }
        [HttpPost]
        public async Task<ActionResult> AddModel(string name, string Brands)
        {
            try
            {
                BrandDTO b = await OptionsService.Brand.Get(x => x.Name == Brands);
                ModelDTO m = new ModelDTO() { Name = name, Brand = b };
                await OptionsService.Model.AddAsync(m);
                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                TempData["ErrorMessageModel"] = e.InnerException!=null?e.InnerException.Message: e.Message;
                return RedirectToAction("Index");
            }

        }
        public async Task<IActionResult> Index()
        {
            List<SelectListItem> items = new List<SelectListItem>();
            List<BrandDTO> brands = (await BrandService.GetAllAsync(x => x.Id != null)).ToList();
            foreach (var i in brands)
                items.Add(new SelectListItem { Text = i.Name, Value = i.Name.ToString() });

            ViewBag.Brands = items;
            return View();
        }
    }
}
