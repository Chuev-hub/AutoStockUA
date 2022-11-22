using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.IdentityModel.Tokens;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Guid.NewGuid().ToByteArray());
        public AccountController( UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserDTO user)
        {
            User newUser = new User() { UserName = user.UserName};

            await _userManager.CreateAsync(newUser);
            newUser = _userManager.Users.SingleOrDefault(x => x.UserName == user.UserName);
            var password = new PasswordHasher<User>().HashPassword(newUser, user.Password);
            await _userManager.AddPasswordAsync(newUser, password);
            await _userManager.AddToRoleAsync(newUser, "user");
            return Ok();
        }
    }
   
}
