using Entities.DataTransferObjects.EstateStatuses;
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
        [Route("api/estateStatuses")]
        [ApiController]
        public class EstateStatusesController : ControllerBase
        {
            private readonly IServiceManager _serviceManager;

            public EstateStatusesController(IServiceManager serviceManager)
            {
                _serviceManager = serviceManager;
            }

            [HttpGet]
            public async Task<IActionResult> GetAllEstateStatuses()
            {
                try
                {
                    var estateStatuses = await _serviceManager.EstateStatusService.GetAllEstateStatusesAsync(false);
                    return Ok(estateStatuses);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            [HttpGet("{id:int}")]
            public async Task<IActionResult> GetOneEstateStatus([FromRoute(Name = "id")] int id)
            {
                try
                {
                    var estateStatus = await _serviceManager
                    .EstateStatusService
                    .GetOneEstateStatusByIdAsync(id, false);

                    if (estateStatus is null)
                        return NotFound(); //404


                    return Ok(estateStatus);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);

                }

            }
        [Authorize(Roles = "Admin")]
        [HttpPost]
            public async Task<IActionResult> CreateOneEstateStatus([FromBody] CreateEstateStatusDto estateStatusDto)
            {
                try
                {
                    if (estateStatusDto is null)
                        return BadRequest(); // 400 

                    await _serviceManager.EstateStatusService.CreateOneEstateStatusAsync(estateStatusDto);

                    return StatusCode(201, estateStatusDto);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
      
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
            public async Task<IActionResult> UpdateOneEstateStatus([FromRoute(Name = "id")] int id,
                                [FromBody] UpdateEstateStatusDto estateStatusDto)
            {
                try
                {
                    if (estateStatusDto is null)
                        return BadRequest(); // 400 

                    await _serviceManager.EstateStatusService.UpdateOneEstateStatusAsync(id, estateStatusDto, false);
                    return NoContent(); // 204
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
            public async Task<IActionResult> DeleteOneEstateStatus([FromRoute(Name = "id")] int id)
            {
                try
                {
                    await _serviceManager.EstateStatusService.DeleteOneEstateStatusAsync(id, false);
                    return NoContent();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
}
