using Entities.DataTransferObjects.Estates;
using Entities.DataTransferObjects.Prices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Prices
{
    public interface IPriceService
    {
        //ileride serviste bu imzalar degisebilecegi icin ayrı ayrı tanimlandi
        Task<IEnumerable<ReadPriceDto>> GelAllPricesAsync(bool trackChanges);
        Task<ReadPriceDto> GetOnePriceByIdAsync(int id, bool trackChanges);
        Task<ReadPriceDto> CreateOnePriceAsync(CreatePriceDto priceDto);
        Task UpdateOnePriceAsync(int id, UpdatePriceDto priceDto, bool trackChanges);
        Task DeleteOnePriceAsync(int id, bool trackChanges);
    }
}
