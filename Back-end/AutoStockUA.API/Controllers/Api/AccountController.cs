using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Guid.NewGuid().ToByteArray());
        public AccountController( UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserDTO user)
        {
            User newUser = new User() { UserName = user.UserName, SecurityStamp = Guid.NewGuid().ToString() };

            IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(_userManager.Users.SingleOrDefault(x => x.UserName == user.UserName), "user");
                return Ok();
            }
            else
                return BadRequest(result.Errors);
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] string token)
        {
            var googleUser = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings() { Audience = new[] { "748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com" } });
            //LoginResultViewModel loginResult = null;

            //if (user.IsEmpty())
            //{
            //    return null;
            //}

            //var signinResult = await _signInManager.ExternalLoginSignInAsync(user.LoginProvider, user.ProviderKey, false);
            //var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            //var user = await userManager.FindByEmailAsync(email);
            //var claims = await GetUserClaims(user);

            //if (signinResult.Succeeded)
            //{
            //    var jwtResult = await jwtAuthManager.GenerateTokens(user, claims, DateTime.UtcNow);

            //    await userManager.SetAuthenticationTokenAsync(
            //        user,
            //        TokenOptions.DefaultProvider,
            //        appSettings.RefreshTokenName,
            //        jwtResult.RefreshToken);

            //    loginResult = new LoginResultViewModel()
            //    {
            //        User = new UserViewModel()
            //        {
            //            Email = email,
            //            AccessToken = jwtResult.AccessToken,
            //            RefreshToken = jwtResult.RefreshToken,
            //            FirstName = user.FirstName,
            //            LastName = user.LastName,
            //            Phone = user.PhoneNumber,
            //            UserId = user.Id
            //        }
            //    };

            //    return loginResult;
            //}

            //if (!email.IsEmpty())
            //{
            //    if (user.IsEmpty())
            //    {
            //        user = new ApplicationUser()
            //        {
            //            UserName = info.Principal.FindFirstValue(ClaimTypes.Email),
            //            Email = info.Principal.FindFirstValue(ClaimTypes.Email)
            //        };
            //        await userManager.CreateAsync(user);
            //    }

            //    await userManager.AddLoginAsync(user, info);
            //    await signInManager.SignInAsync(user, false);
            //    var jwtResult = await jwtAuthManager.GenerateTokens(user, claims, DateTime.UtcNow);

            //    //sucess
            //    await userManager.SetAuthenticationTokenAsync(
            //        user,
            //        TokenOptions.DefaultProvider,
            //        appSettings.RefreshTokenName,
            //        jwtResult.RefreshToken);

            //    loginResult = new LoginResultViewModel()
            //    {
            //        User = new UserViewModel()
            //        {
            //            Email = email,
            //            AccessToken = jwtResult.AccessToken,
            //            RefreshToken = jwtResult.RefreshToken,
            //            FirstName = user.FirstName,
            //            LastName = user.LastName,
            //            Phone = user.PhoneNumber,
            //            UserId = user.Id
            //        }
            //    };

            //    return loginResult;
            //}

            //https://www.youtube.com/watch?v=ynPFODvJD6w
            return Ok();
        }
    }
   
}
