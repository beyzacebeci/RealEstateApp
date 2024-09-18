using Entities.DataTransferObjects.Currencies;
using Entities.DataTransferObjects.Photos;
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
    [Route("api/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public PhotosController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPhotos()
        {
            try
            {
                var photos = await _serviceManager.PhotoService.GetAllPhotosAsync(false);
                return Ok(photos);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("estateallPhotos/{id}")]
        public async Task<IActionResult> GetAllPhotosOneEstate([FromRoute(Name = "id")] int estateId)
        {
            try
            {
                var photos = await _serviceManager.PhotoService.GetAllPhotosOneEstateAsync(estateId,false);
                return Ok(photos);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOnePhoto([FromRoute(Name = "id")] int id)
        {
            try
            {
                var photo = await _serviceManager
                     .PhotoService
                    .GetOnePhotoByIdAsync(id, false);

                if (photo == null)
                    return NotFound(); //404

                return Ok(photo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost]
        public async Task<IActionResult> CreateOnePhotoAsync([FromBody] CreatePhotoDto photoDto)
        {
            try
            {
                if (photoDto == null)
                    return NotFound();




                    await _serviceManager
                    .PhotoService
                    .CreateOnePhotoAsync(photoDto);

                return StatusCode(201, photoDto);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOnePhoto([FromRoute(Name = "id")] int id)
        {
            try
            {
                await _serviceManager.PhotoService.DeleteOnePhotoAsync(id, false);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
