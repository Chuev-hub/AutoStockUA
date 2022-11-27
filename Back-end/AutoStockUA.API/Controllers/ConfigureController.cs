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
    public class Data
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
    [Authorize(Roles = "admin")]
    public class ConfigureController : Controller
    {
        private UserManager<User> _userManager { get; set; }
        public OptionsService OptionsService { get; set; }
        public GenericService<BrandDTO, Brand> BrandService { get; set; }
        public ConfigureController(OptionsService op, GenericService<BrandDTO, Brand> service,UserManager<User> userManager)
        {
            BrandService = service;
            OptionsService = op;
            _userManager = userManager;
        }
        [HttpPost]
        public async Task<ActionResult> DeleteModel([FromBody] Data data)
        {
            try
            {
                switch (data.Type)
                {
                    case "Accident status":
                        await OptionsService.AccidentStatus.RemoveAtAsync((x) => x.Name == data.Name);
                        return Ok();
                       
                    case "Body type":
                         await OptionsService.BodyType.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Brand":
                         await OptionsService.Brand.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Color":
                         await OptionsService.Color.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Condition type":
                         await OptionsService.ConditionType.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Country":
                         await OptionsService.Country.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Drive type":
                         await OptionsService.DriveType.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Engine type":
                         await OptionsService.EngineType.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Model":
                         await OptionsService.Model.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Gearbox type":
                         await OptionsService.GearboxType.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Number of doors":
                         await OptionsService.NumberOfDoors.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Number of places":
                         await OptionsService.NumberOfPlaces.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Region":
                         await OptionsService.Region.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                    case "Type":
                         await OptionsService.Type.RemoveAtAsync((x) => x.Name == data.Name);
                       return Ok();
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                TempData["ErrorMessage"] = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<ActionResult> ChangePsw(string oldpassword, string password)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User); ;
            IdentityResult result = await _userManager.ChangePasswordAsync(user, oldpassword, password);
            if (result.Succeeded)
                return RedirectToAction("Index");
            else
            {
                TempData["ErrorMessageChange"] = result.Errors.ToList()[0].Description;
                return RedirectToAction("Index");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] Data data)
        {
            try
            {
                switch (data.Name)
                {
                    case "Accident status":
                        return Json((await OptionsService.AccidentStatus.GetAllAsync((x) => true)).ToList());
                    case "Body type":
                        return Json((await OptionsService.BodyType.GetAllAsync((x) => true)).ToList());
                    case "Brand":
                        return Json((await OptionsService.Brand.GetAllAsync((x) => true)).ToList());
                    case "Color":
                        return Json((await OptionsService.Color.GetAllAsync((x) => true)).ToList());
                    case "Condition type":
                        return Json((await OptionsService.ConditionType.GetAllAsync((x) => true)).ToList());
                    case "Country":
                        return Json((await OptionsService.Country.GetAllAsync((x) => true)).ToList());
                    case "Drive type":
                        return Json((await OptionsService.DriveType.GetAllAsync((x) => true)).ToList());
                    case "Engine type":
                        return Json((await OptionsService.EngineType.GetAllAsync((x) => true)).ToList());
                    case "Model":
                        return Json((await OptionsService.Model.GetAllAsync((x) => true)).ToList());
                    case "Gearbox type":
                        return Json((await OptionsService.GearboxType.GetAllAsync((x) => true)).ToList());
                    case "Number of doors":
                        return Json((await OptionsService.NumberOfDoors.GetAllAsync((x) => true)).ToList());
                    case "Number of places":
                        return Json((await OptionsService.NumberOfPlaces.GetAllAsync((x) => true)).ToList());
                    case "Region":
                        return Json((await OptionsService.Region.GetAllAsync((x) => true)).ToList());
                    case "Type":
                        return Json((await OptionsService.Type.GetAllAsync((x) => true)).ToList());
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                TempData["ErrorMessage"] = e.InnerException != null ? e.InnerException.Message : e.Message;
                return BadRequest();
            }
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
                    case "Body type":
                        await OptionsService.BodyType.AddAsync(new BodyTypeDTO() { Name = name });
                        break;
                    case "Brand":
                        await OptionsService.Brand.AddAsync(new BrandDTO() { Name = name });
                        break;
                    case "Color":
                        await OptionsService.Color.AddAsync(new ColorDTO() { Name = name });
                        break;
                    case "Condition type":
                        await OptionsService.ConditionType.AddAsync(new ConditionTypeDTO() { Name = name });
                        break;
                    case "Country":
                        await OptionsService.Country.AddAsync(new CountryDTO() { Name = name });
                        break;
                    case "Drive type":
                        await OptionsService.DriveType.AddAsync(new DriveTypeDTO() { Name = name });
                        break;
                    case "Engine type":
                        await OptionsService.EngineType.AddAsync(new EngineTypeDTO() { Name = name });
                        break;
                    case "Gearbox type":
                        await OptionsService.GearboxType.AddAsync(new GearboxTypeDTO() { Name = name });
                        break;
                    case "Number of doors":
                        await OptionsService.NumberOfDoors.AddAsync(new NumberOfDoorsDTO() { Name = name });
                        break;
                    case "Number of places":
                        await OptionsService.NumberOfPlaces.AddAsync(new NumberOfPlacesDTO() { Name = name });
                        break;
                    case "Region":
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
                TempData["ErrorMessage"] = e.InnerException != null ? e.InnerException.Message : e.Message;
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
        public async Task<IActionResult> Delete()
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
