using Entities.DataTransferObjects.Currencies;
using Microsoft.AspNetCore.Authorization;
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
    [Route("api/currencies")]
    public class CurrenciesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public CurrenciesController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }
       
        [HttpGet]
        public async Task<IActionResult> GetAllCurrencies()
        {
            try
            {
                var currencies = await _serviceManager.CurrencyService.GelAllCurrenciesAsync(false);
                return Ok(currencies);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOneCurrency([FromRoute(Name = "id")] int id)
        {
            try
            {
                var currency = await _serviceManager
                     .CurrencyService
                    .GetOneCurrencyByIdAsync(id, false);

                if (currency == null)
                    return NotFound(); //404

                return Ok(currency);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("{code}")]
        public async Task<IActionResult> GetOneCurrencyByCode([FromRoute(Name = "code")] string code)
        {
            try
            {
                var currency = await _serviceManager
                     .CurrencyService
                    .GetOneCurrencyByCodeAsync(code, false);

                if (currency == null)
                    return NotFound(); //404

                return Ok(currency);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles="Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOneCurrencyAsync([FromBody] CreateCurrencyDto currencyDto)
        {
            try
            {
                if (currencyDto == null)
                    return NotFound();

                await _serviceManager
                    .CurrencyService
                    .CreateOneCurrencyAsync(currencyDto);

                return StatusCode(201, currencyDto);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOneCuurency([FromRoute(Name = "id")] int id,
            [FromBody] UpdateCurrencyDto currencyDto)
        {
            try
            {
                if (currencyDto == null)
                    return BadRequest(); //400

                await _serviceManager.CurrencyService.UpdateOneCurrencyAsync(id, currencyDto, false);

                return NoContent(); //204
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOneCurrency([FromRoute(Name = "id")] int id)
        {
            try
            {
                await _serviceManager.CurrencyService.DeleteOneCurrencyAsync(id, false);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
