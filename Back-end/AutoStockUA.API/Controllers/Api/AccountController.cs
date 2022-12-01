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
using System.IdentityModel.Tokens.Jwt;
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
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserDTO user)
        {
            if (ModelState.IsValid)
            {
                User newUser = new User() { UserName = user.UserName, Email = user.Email, SecurityStamp = Guid.NewGuid().ToString() };

                IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(_userManager.Users.SingleOrDefault(x => x.UserName == user.UserName), "user");
                    return Ok();
                }
                return BadRequest(result.Errors);
            }
            return BadRequest("Model is not valid");
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] string token)
        {
            GoogleJsonWebSignature.Payload googleUser = await GoogleJsonWebSignature.ValidateAsync(token,
                new GoogleJsonWebSignature.ValidationSettings() { Audience = new[] { "748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com" } });
            User user = await _userManager.FindByEmailAsync(googleUser.Email);
            IdentityResult result = IdentityResult.Failed();
            if (user == null)
            {
                var userInfo = new UserLoginInfo("google", googleUser.Email, "GOOGLE");
                result = await _userManager.AddLoginAsync(user, userInfo);
                user = await _userManager.FindByEmailAsync(googleUser.Email);
            }
            if (result.Succeeded)
            {
                ClaimsIdentity claim = new ClaimsIdentity(
                    new List<Claim>() { new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName) },
                    "Token",
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

                var now = DateTime.Now;
                var securityToken = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claim.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                    );

                return Json(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                    user = user
                });
            }
            return BadRequest();
            //https://www.youtube.com/watch?v=ynPFODvJD6w
        }
    }

}
