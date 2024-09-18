using Repositories.Contracts.Currencies;
using Repositories.Contracts.Estates;
using Repositories.Contracts.EstateStatuses;
using Repositories.Contracts.EstateTypes;
using Repositories.Contracts.Photos;
using Repositories.Contracts.Prices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts
{
    public interface IRepositoryManager
    {
        IEstateRepository EstateRepository { get; }
        IEstateTypeRepository EstateTypeRepository { get; }
        IEstateStatusRepository EstateStatusRepository { get; }
        ICurrencyRepository CurrencyRepository { get; }
        IPriceRepository PriceRepository { get; }
        IPhotoRepository PhotoRepository { get; }

        //repolari kaydetmek icin 
        Task SaveAsync();
    }
}
