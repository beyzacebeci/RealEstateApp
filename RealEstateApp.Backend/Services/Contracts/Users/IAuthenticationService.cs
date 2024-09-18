using Entities.DataTransferObjects.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Users
{
    public interface IAuthenticationService
    {
        //Identity result kullanıcı ve rol yönetimi islemlerinin sonucunu tutar basarili,basarisiz,hata vb
        Task<IdentityResult> RegisterUser(UserForRegistrationDto userForRegistrationDto);
        Task<bool> ValidateUser(UserForAuthenticationDto userForAuthDto);
        Task<TokenDto> CreateToken();
    }
}
