using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AutoStockUA.API
{
    public class AuthOptions
    {
        public static string ISSUER ;
        public static string AUDIENCE ;
        public static string KEY;

        public static double LIFETIME { get => 20; }

        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
