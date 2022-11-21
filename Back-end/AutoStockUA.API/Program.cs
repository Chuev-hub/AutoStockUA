using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AutoStockContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));

});
builder.Services.AddIdentity<User, IdentityRole<int>>()
 .AddEntityFrameworkStores<AutoStockContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Login";
    options.AccessDeniedPath = "/Login/AccessDenied";

});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();
builder.Services.AddSession();
builder.Services.AddScoped(typeof(IService<,>), typeof(GenericService<,>));
builder.Services.AddScoped(typeof(GenericService<,>));
builder.Services.AddScoped(typeof(OptionsService));
builder.Services.AddScoped(typeof(UserService));
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


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();
app.UseSession();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


