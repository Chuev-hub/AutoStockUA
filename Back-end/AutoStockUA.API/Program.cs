using AutoStockUA.API;
using AutoStockUA.API.Controllers.Api;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoStockUA.API.Hubs;
using Microsoft.CodeAnalysis.CSharp.Syntax;

var builder = WebApplication.CreateBuilder(args);

AuthOptions.KEY = builder.Configuration["KEY"];
AuthOptions.ISSUER = builder.Configuration["ISSUER"];
AuthOptions.AUDIENCE = builder.Configuration["AUDIENCE"];
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AutoStockContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));

});

builder.Services.AddSignalR(e => {
    e.MaximumReceiveMessageSize = 102400000;
    e.EnableDetailedErrors = true;
});
builder.Services.AddIdentity<User, IdentityRole<int>>()
 .AddEntityFrameworkStores<AutoStockContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Login";
    options.AccessDeniedPath = "/Login/AccessDenied";

});
builder.Services.AddAuthentication()
.AddCookie()
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = AuthOptions.ISSUER,
        ValidateAudience = true,
        ValidAudience = AuthOptions.AUDIENCE,
        ValidateLifetime = true,
        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true,
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("Token-Expired", "true");
            }
            return Task.CompletedTask;
        }
    };
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["GClientId"];
    options.ClientSecret = builder.Configuration["GSecret"];

    options.Scope.Add("profile");
    options.SignInScheme = IdentityConstants.ExternalScheme;
});
builder.Services.AddSession();
builder.Services.AddScoped(typeof(IService<,>), typeof(GenericService<,>));
builder.Services.AddScoped(typeof(GenericService<,>));
builder.Services.AddScoped(typeof(ChatService));
builder.Services.AddScoped(typeof(OptionsService));
builder.Services.AddScoped(typeof(AdvertisementService));
builder.Services.AddScoped(typeof(UserService));
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowOrigin",
//        policy =>
//        {
//            policy
//                .AllowAnyHeader()
//                .AllowAnyMethod().SetIsOriginAllowed(o=>true);

//        });
//});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AutoStockContext>();
    await context.Database.EnsureCreatedAsync();
}

//app.UseHttpsRedirection();

app.UseStaticFiles();


app.UseRouting();

app.UseCors(
    x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin 
    );
app.MapHub<ChatHub>("/chatHub");

app.UseSession();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();