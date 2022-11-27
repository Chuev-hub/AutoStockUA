using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace AutoStockUA.API
{
    public class JwtAuthManager 
    {
        //public UserManager<ApplicationUser> userManager { get; }
        //private readonly byte[] secret;
        //private readonly AppSettings appSettings;
        //private readonly IConfiguration configuration;

        //public JwtAuthManager(IOptions<AppSettings> appSettings,
        //    UserManager<ApplicationUser> userManager,
        //    IConfiguration configuration)
        //{
        //    this.appSettings = appSettings.Value;
        //    secret = Encoding.ASCII.GetBytes("SECRET TO SIGN THE TOKEN: NOT TO BE HARD-CODED HERE. JUST FOR DEMONSTRATION PURPOSES);
        //    this.userManager = userManager;
        //}

        //public async Task<JwtAuthResultViewModel> GenerateTokens(ApplicationUser user, IEnumerable<Claim> claims, DateTime now)
        //{
        //    var shouldAddAudienceClaim = string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);

        //    var jwtToken = new JwtSecurityToken(
        //        appSettings.AuthSettings.Issuer,
        //        shouldAddAudienceClaim ? appSettings.AuthSettings.Audience : string.Empty,
        //        claims,
        //        expires: now.AddMinutes(IdentityConstants.AccessTokenExpiryInMinutes),
        //        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature));

        //    var accessTokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        //    var refreshTokenstring = await userManager.GenerateUserTokenAsync(user, appSettings.AppName, appSettings.RefreshTokenName);

        //    var refreshTokenModel = new RefreshTokenViewModel
        //    {
        //        UserName = user.Email,
        //        TokenString = refreshTokenstring,
        //        ExpireAt = now.AddMinutes(appSettings.AuthSettings.RefreshTokenExpiration)
        //    };

        //    return new JwtAuthResultViewModel
        //    {
        //        AccessToken = accessTokenString,
        //        RefreshToken = refreshTokenModel
        //    };
        //}
    }
}
