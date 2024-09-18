using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Repositories.Contracts;
using Services.Contracts;
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

namespace Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IEstateService> _estateService;
        private readonly Lazy<IEstateTypeService> _estateTypeService;
        private readonly Lazy<IEstateStatusService> _estateStatusService;
        private readonly Lazy<IAuthenticationService> _authenticationService;
        private readonly Lazy<ICurrencyService> _currencyService;
        private readonly Lazy<IPriceService> _priceService;
        private readonly Lazy<IPhotoService> _photoService;



        public ServiceManager(
            IRepositoryManager repositoryManager,
            IMapper mapper,
            UserManager<User> userManager,
            IConfiguration configuration)
        {
            _estateService = new Lazy<IEstateService>(() => new EstateManager(repositoryManager,mapper));
            _estateTypeService = new Lazy<IEstateTypeService>(() => new EstateTypeManager(repositoryManager,mapper));
            _estateStatusService = new Lazy<IEstateStatusService>(() => new EstateStatusManager(repositoryManager,mapper));
            _currencyService = new Lazy<ICurrencyService>(() => new CurrencyManager(repositoryManager,mapper));
            _priceService = new Lazy<IPriceService>(() => new PriceManager(repositoryManager, mapper));
            _photoService = new Lazy<IPhotoService>(() => new PhotoManager(repositoryManager, mapper));

            _authenticationService = new Lazy<IAuthenticationService>(() => 
            new AuthenticationManager(mapper,userManager,configuration)
            );

        }
        public IEstateService EstateService => _estateService.Value;
        public IEstateTypeService EstateTypeService => _estateTypeService.Value;
        public IEstateStatusService EstateStatusService => _estateStatusService.Value;
        public ICurrencyService CurrencyService => _currencyService.Value;
        public IPriceService PriceService => _priceService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;
        public IPhotoService PhotoService => _photoService.Value;

    }
}
