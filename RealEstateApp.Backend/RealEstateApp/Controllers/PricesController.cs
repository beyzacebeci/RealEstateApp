using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateApp.Controllers
{
    [ApiController]
    [Route("api/prices")]
    public class PricesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public PricesController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPrices()
        {
            try
            {
                var prices = await _serviceManager.PriceService.GelAllPricesAsync(false);
                return Ok(prices);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOnePrice([FromRoute(Name = "id")] int id)
        {
            try
            {
                var price = await _serviceManager
                     .PriceService
                    .GetOnePriceByIdAsync(id, false);

                if (price == null)
                    return NotFound(); //404

                return Ok(price);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
