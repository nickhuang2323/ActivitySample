using Microsoft.AspNetCore.Mvc;

namespace ActivitySample.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
