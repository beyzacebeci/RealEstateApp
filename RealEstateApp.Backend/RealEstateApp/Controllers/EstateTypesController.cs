using Entities.DataTransferObjects.EstateTypes;
using Entities.Models;
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
    [Route("api/[controller]")]
    [ApiController]
    public class EstateTypesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public EstateTypesController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEstateTypes()
        {
            try
            {
                var estateTypes= await _serviceManager.EstateTypeService.GetAllEstateTypesAsync(false);
                return Ok(estateTypes);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOneEstateType([FromRoute(Name = "id")] int id)
        {
            try
            {
                var estateType = await _serviceManager
                .EstateTypeService
                .GetOneEstateTypeByIdAsync(id, false);

                if (estateType is null)
                    return NotFound(); //404


                return Ok(estateType);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
              
            }

        }
       
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateOneEstateType([FromBody] CreateEstateTypeDto estateTypeDto)
        {
            try
            {
                if (estateTypeDto is null)
                    return BadRequest(); // 400 

                await _serviceManager.EstateTypeService.CreateOneEstateTypeAsync(estateTypeDto);

                return StatusCode(201, estateTypeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOneEstateType([FromRoute(Name = "id")] int id,
                            [FromBody] UpdateEstateTypeDto estateTypeDto)
        {
            try
            {
                if (estateTypeDto is null)
                    return BadRequest(); // 400 

                await _serviceManager.EstateTypeService.UpdateOneEstateTypeAsync(id, estateTypeDto, false);
                return NoContent(); // 204
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
      
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOneEstateType([FromRoute(Name = "id")] int id)
        {
            try
            {
                await _serviceManager.EstateTypeService.DeleteOneEstateTypeAsync(id, false);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
