using AutoStockUA.API.Models;
using AutoStockUA.DAL.Context;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AutoStockUA.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, AutoStockContext c)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
      
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}