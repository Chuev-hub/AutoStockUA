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
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IConfiguration _config;
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Guid.NewGuid().ToByteArray());
        public AccountController(UserManager<User> userManager,
                              IConfiguration config, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;

        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserDTO user)
        {
            if (ModelState.IsValid)
            {
                User newUser = new User() { UserName = user.Email, Email = user.Email, SecurityStamp = Guid.NewGuid().ToString() };

                IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    User u = await _userManager.FindByEmailAsync(user.Email);
                    await _userManager.AddToRoleAsync(u, "user");
                    
                    return Ok();
                }
                return BadRequest(result.Errors.Select(x=>x.Description));
            }
            return BadRequest("NotValid");
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDTO userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new[] { "NotValidObj" });
            SignInResult result = await _signInManager.CheckPasswordSignInAsync(await _userManager.FindByEmailAsync(userDto.Email), userDto.Password, false);
            if (result.Succeeded)
            {
                User user = await _userManager.FindByEmailAsync(userDto.Email);
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
            return BadRequest(new[] { "NotValid" });
            //https://www.youtube.com/watch?v=ynPFODvJD6w
        }
    
    [HttpPost]
    public async Task<IActionResult> GoogleLogin([FromBody] string token)
    {
        GoogleJsonWebSignature.Payload googleUser = await GoogleJsonWebSignature.ValidateAsync(token,
            new GoogleJsonWebSignature.ValidationSettings() { Audience = new[] { _config["GClientId"] } });
        User user = await _userManager.FindByEmailAsync(googleUser.Email);
        IdentityResult result = IdentityResult.Failed();
            if (user == null)
            {
                var userInfo = new UserLoginInfo("google", googleUser.Email, "GOOGLE");
                user = new User { Email = googleUser.Email, UserName = googleUser.Email };
                await _userManager.CreateAsync(user);
                await _userManager.AddToRoleAsync(user, "user");
                result = await _userManager.AddLoginAsync(user, userInfo);
                user = await _userManager.FindByEmailAsync(googleUser.Email);
            }
            else
                result = IdentityResult.Success;
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
        return BadRequest(new[] {"Error"});
        //https://www.youtube.com/watch?v=ynPFODvJD6w
    }
}

}
