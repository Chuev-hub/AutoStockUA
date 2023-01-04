using AutoStockUA.API.Models;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;


namespace AutoStockUA.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private OptionsService _os;

        public HomeController(ILogger<HomeController> logger, AutoStockContext c,OptionsService os)
        {
            _logger = logger;
            _os = os;
        }

        public IActionResult Index()
        {
            return View();
        }
        class Bran { 
            public string name { get; set; }
            public string value { get; set; }
        }

        public async Task<IActionResult> Privacy()
        {
            //12002499
            //1yhdP8ziZcGZkmYRjHdqiKffKxVr0E9wycIHwUIk
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}