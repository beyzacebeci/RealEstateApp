using Repositories.Contracts;
using Repositories.Contracts.Currencies;
using Repositories.Contracts.Estates;
using Repositories.Contracts.EstateStatuses;
using Repositories.Contracts.EstateTypes;
using Repositories.Contracts.Photos;
using Repositories.Contracts.Prices;
using Repositories.EFCore.Currencies;
using Repositories.EFCore.Estates;
using Repositories.EFCore.EstateStatuses;
using Repositories.EFCore.EstateTypes;
using Repositories.EFCore.Photos;
using Repositories.EFCore.Prices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _context;
        private readonly Lazy<IEstateRepository> _estateRepository;
        private readonly Lazy<IEstateTypeRepository> _estateTypeRepository;
        private readonly Lazy<IEstateStatusRepository> _estateStatusRepository;
        private readonly Lazy<ICurrencyRepository> _currencyRepository;
        private readonly Lazy<IPriceRepository> _priceRepository;
        private readonly Lazy<IPhotoRepository> _photoRepository;



        public RepositoryManager(RepositoryContext context)
        {
            _context = context;
            _estateRepository = new Lazy<IEstateRepository>(()=> new EstateRepository(_context));
            _estateTypeRepository = new Lazy<IEstateTypeRepository>(() => new EstateTypeRepository(_context));
            _estateStatusRepository = new Lazy<IEstateStatusRepository>(() => new EstateStatusRepository(_context));
            _currencyRepository = new Lazy<ICurrencyRepository>(() => new CurrencyRepository(_context));
            _priceRepository = new Lazy<IPriceRepository>(() => new PriceRepository(_context));
            _photoRepository = new Lazy<IPhotoRepository>(() => new PhotoRepository(_context));

        }

        /*ayri ayri her repositorynin IOC kaydı yapılmaması icin merkezi olarak bir newleme yaptim 
        boylece ıoc ye yalnizca RepositoryManager ve ve interfaceini kaydetmek yeterli oluyor olucak
        bu newleme o repository kullanıldığı zaman gerçekleştirilir. (Lazy Loading yapısı) 
        boylece doğrudan newleme yapmamış oluruz managerdan estate nesnesi istendiği anda newleme yapilir
        */
        public IEstateRepository EstateRepository => _estateRepository.Value;
        public IEstateTypeRepository EstateTypeRepository => _estateTypeRepository.Value;
        public IEstateStatusRepository EstateStatusRepository => _estateStatusRepository.Value;
        public ICurrencyRepository CurrencyRepository => _currencyRepository.Value;
        public IPriceRepository PriceRepository => _priceRepository.Value;
        public IPhotoRepository PhotoRepository => _photoRepository.Value;

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
