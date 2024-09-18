using Entities.DataTransferObjects.Estates;
using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using Services.Contracts.Estates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RealEstateApp.Controllers
{

    [ApiController]
    [Route("api/estates")]
    public class EstatesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public EstatesController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllEstates()
        {
            try
            {
                var prices = await _serviceManager.EstateService.GelAllEstatesNoPaginationAsync(false);
                return Ok(prices);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetAllEstates([FromQuery] EstateParameters estateParameters)
        {
            try
            {
                var pagedResult = await _serviceManager
                    .EstateService
                    .GelAllEstatesAsync(estateParameters, false);

                //// Yanıt başlığına ekle
                Response.Headers.Add("X-Pagination",
                JsonSerializer.Serialize(pagedResult.metaData));

                // Yanıt olarak estate verilerini döndür
                return Ok(pagedResult.estates);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOneEstate([FromRoute(Name = "id")] int id)
        {
            try
            {
                var estate = await _serviceManager
                     .EstateService
                    .GetOneEstateByIdAsync(id, false);

                if (estate == null)
                    return NotFound(); //404
                return Ok(estate);


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Authorize(Roles = "Admin,User")]
        [HttpGet("{userId}/withUserId")]
        public async Task<IActionResult> GetAllEstatesWithUserId([FromRoute] string userId)
        {
            try
            {
                // Eğer kullanıcı Admin ise tüm ilanları alabilir
                if (User.IsInRole("Admin"))
                {
                    var estates = await _serviceManager.EstateService.GelAllEstatesWithUserIdAsync(userId, false);
                    return Ok(estates);
                }

                // Eğer kullanıcı User ise sadece kendi ilanlarını alabilir
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (currentUserId != null && currentUserId == userId)
                {
                    var estates = await _serviceManager.EstateService.GelAllEstatesWithUserIdAsync(userId, false);
                    return Ok(estates);
                }

                return Forbid(); // Yetki yoksa erişim engellenir
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Bir hata oluştu: " + ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost]
        public async Task<IActionResult> CreateOneEstateAsync([FromBody] CreateEstateDto estateDto)
        {
            try
            {
                if (estateDto == null)
                    return NotFound();

                await _serviceManager
                    .EstateService
                    .CreateOneEstateAsync(estateDto);

                return StatusCode(201, estateDto);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
       
        [Authorize(Roles = "Admin,User")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOneEstate([FromRoute(Name = "id")] int id,
        [FromBody] UpdateEstateDto estateDto)
        {
            try
            {
                if (estateDto.EstatePriceAmount == null)
                    return BadRequest(); //400


                // Log the DTO to ensure it contains the expected values
                Console.WriteLine($"Received DTO - EstatePriceAmount: {estateDto.EstatePriceAmount}");

                await _serviceManager.EstateService.UpdateOneEstateAsync(id, estateDto, true);

                return NoContent(); //204
            }
            catch (Exception ex)
            {
                // Log exception
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, ex.Message); //500
            }
        }


        [Authorize(Roles = "Admin,User")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOneEstate([FromRoute(Name = "id")] int id)
        {
            try
            {
                await _serviceManager.EstateService.DeleteOneEstateAsync(id, false);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetTotalEstatesCount()
        {
            try
            {
                var count = await _serviceManager.EstateService.GetTotalEstatesCountAsync(false);
                return Ok(new { TotalEstatesCount = count });
            }
            catch (Exception ex)
            {
                // Hata yönetimi
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpGet("types/counts")]
        public async Task<IActionResult> GetEstateCountByType()
        {
            try
            {
                var result = await _serviceManager.EstateService.GetAllEstateTypesWithCountsAsync(false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Hata yönetimi
                return StatusCode(500, ex.Message);
            }
        }

    }
}
