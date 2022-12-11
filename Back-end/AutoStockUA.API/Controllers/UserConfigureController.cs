using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace AutoStockUA.API.Controllers
{
    public class UserConfigureDTO {
        public  List<SelectListItem> Users { get; set; }
        public List<SelectListItem> Roles { get; set; }
    }

    [Authorize(Roles = "admin")]
    public class UserConfigureController : Controller
    {

        public UserManager<User> _userManager { get; set; }
        public UserService UserService { get; set; }
        public UserConfigureController(UserService userService, UserManager<User> userManager)
        {
            UserService = userService;
            _userManager = userManager;
        }
        public async Task<IActionResult> Index()
        {
            List<SelectListItem> users = new List<SelectListItem>();
            List<SelectListItem> roles = new List<SelectListItem>();
            List<UserDTO> userdtos = (await UserService.GetAllAsync(x => x != null)).ToList();
            List<IdentityRole<int>> rolesdtos = (await UserService.GetAllRolesAsync(x => x != null)).ToList();
            foreach (var i in userdtos)
                users.Add(new SelectListItem { Text = i.UserName, Value = i.UserName });
            foreach (var i in rolesdtos)
                roles.Add(new SelectListItem { Text = i.Name, Value = i.Name });

            ViewBag.Users = new UserConfigureDTO() { Users = users, Roles = roles };
            return View();
        }
        public async Task<string> Role(string Name)
        {
            User user = _userManager.Users.FirstOrDefault(x => x.UserName == Name);
            return (await _userManager.GetRolesAsync(user))[0] ;
        }
        [HttpPost]
        public async Task<IActionResult> Role([FromBody] Data data)
        {
            User user = _userManager.Users.FirstOrDefault(x => x.UserName == data.Name);

            if ((await _userManager.GetRolesAsync(user)).FirstOrDefault(x=>x== data.Type) != data.Type)
            {
                await _userManager.RemoveFromRolesAsync(user, await _userManager.GetRolesAsync(user));
                await _userManager.AddToRoleAsync(user, data.Type);
            }
            return Ok();
        }
    }
}
