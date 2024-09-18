using Services.Contracts.Currencies;
using Services.Contracts.Estates;
using Services.Contracts.EstateStatuses;
using Services.Contracts.EstateTypes;
using Services.Contracts.Photos;
using Services.Contracts.Prices;
using Services.Contracts.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts
{
    public interface IServiceManager
    {
        IEstateService EstateService { get; }
        IEstateTypeService EstateTypeService { get; }
        IEstateStatusService EstateStatusService { get; }
        IAuthenticationService AuthenticationService { get; }
        ICurrencyService CurrencyService { get; }
        IPriceService PriceService { get; }
        IPhotoService PhotoService { get; }
    }
}
