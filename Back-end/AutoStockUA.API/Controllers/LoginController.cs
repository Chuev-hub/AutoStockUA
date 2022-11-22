using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace AutoStockUA.API.Controllers
{

    public class LoginController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> SignInManager;
        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            SignInManager = signInManager;
        }
        public async Task<IActionResult> Index()
        {
            return View();
        }
        public IActionResult AccessDenied()
        {
            return View();
        }
        public async Task<IActionResult> Logout()
        {
            await SignInManager.SignOutAsync();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(UserDTO user)
        {
            if (ModelState.IsValid)
            {
                var data = _userManager.Users.FirstOrDefault(s => s.UserName == user.UserName);

                var f_password = new PasswordHasher<User>().VerifyHashedPassword(data, data.PasswordHash, user.Password);
                var result = await SignInManager.PasswordSignInAsync(data, user.Password, true, false);
                if (result == SignInResult.Success)
                {
                    //add session
                    HttpContext.Session.SetString("UserName",data.UserName);
                    HttpContext.Session.SetString("id", data.Id.ToString());
                    ViewData["isLoged"] = true;
                    return RedirectToAction("Index", "Configure"); 
                }
                else
                {
                    TempData["error"]= "Login failed";
                    return RedirectToAction("Index");
                }
            }
            TempData["error"]= "Login failed";
            return RedirectToAction("Index");
        }


    }
}
