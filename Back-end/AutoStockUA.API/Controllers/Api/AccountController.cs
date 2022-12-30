using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace AutoStockUA.API.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
 
    [EnableCors]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IConfiguration _config;
        private AutoStockContext _context;

        private ChatService _chatService;
        private AdvertisementService _advertisementService;
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Guid.NewGuid().ToByteArray());
        public AccountController(UserManager<User> userManager, ChatService chatService, AdvertisementService advertisementService,
        IConfiguration config, SignInManager<User> signInManager,AutoStockContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
            _advertisementService = advertisementService;
            _chatService = chatService;
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            return Json(new User(){ UserName = user.UserName, PhoneNumber=user.PhoneNumber, Avatar=user.Avatar });
        }
        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Put([FromBody] User user)
        {
            _context.Attach(user);
            IdentityResult r =  await _userManager.UpdateAsync(user);
            if (r.Succeeded)
                return Ok();
            else
                return BadRequest((r.Errors.Select(x => x.Description)));
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ChangePassword([FromBody] User user,[FromHeader] string newPassword, [FromHeader] string oldPassword)
        {
            _context.Attach(user);
            IdentityResult r = await _userManager.ChangePasswordAsync(user,oldPassword,newPassword);
            if (r.Succeeded)
                return Ok();
            else
                return BadRequest((r.Errors.Select(x => x.Description)));
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Retoken([FromBody] User userData)
        {
            User user = await _userManager.FindByEmailAsync(userData.Email);
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
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> CreateChat( [FromBody]List<UserDTO> users)
        {
            if (users[0].Id == users[1].Id)
                return BadRequest();
            try
            {
                await _chatService.AddAsync(new ChatDTO() { Users = users });

            }
            catch (Exception e)
            {
                if(e.Message== "Exists")
                    return Ok();
                
            }
            return Ok();
        }
        [HttpGet]
        [Route("{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetChats(int id)
        {
            try
            {

                var chats = _userManager.Users.Include(x => x.Chats).FirstOrDefault(x => x.Id == id).Chats;
                foreach(var i in chats)
                    i.Users = (await _chatService.Get(x => x.Id == i.Id)).Users.Select(c=> new User() {Id =(int)c.Id,UserName = c.UserName,Avatar= c.Avatar }).ToList();
                return Ok(chats);

            }
            catch (Exception e)
            {

            }
            return Ok();

        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ChangeAvatar([FromBody] Data data)
        {
            User user = await _userManager.FindByEmailAsync(data.Email);
            user.Avatar = data.Avatar;
            await _userManager.UpdateAsync(user);
            return Ok();
        }
        [Route("{id:int}")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAdvertisements(int id)
        {
            try
            {
                var list = await _advertisementService.GetAllAsync(x => x.OwnerId == id)
                 ; return Json(list);

            }catch(Exception e)
            {
                return Ok();
            }
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get([FromQuery]string email)
        {
            return Json((await _userManager.Users.AsNoTracking().SingleOrDefaultAsync(x => x.Email == email)));
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
