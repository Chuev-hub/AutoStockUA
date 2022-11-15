using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        public AccountController( UserManager<User> userManager)
        {
            _userManager = userManager;
        }

    }
}
