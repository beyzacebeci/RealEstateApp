using Entities.DataTransferObjects.Users;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace   RealEstateApp.Controllers
{
   [ApiController]
   [Route("api/authentication")]

    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public AuthenticationController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistrationDto)
        {
            var result = await _serviceManager.AuthenticationService.RegisterUser(userForRegistrationDto);

            if (!result.Succeeded)
            {
                //basarisiz ise ilgili hatalar modelstate uzerine eklenir
                foreach (var error  in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);

            }
            return StatusCode(201);

        }


        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDto user)
        {
            if (!await _serviceManager.AuthenticationService.ValidateUser(user))
                return Unauthorized("Invalid username or password.");// 401 durumunu temsil et

            var tokenDto = await _serviceManager.AuthenticationService.CreateToken();


            return Ok(tokenDto);

        }

    }
}
