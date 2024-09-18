using Entities.DataTransferObjects.Currencies;
using Entities.DataTransferObjects.Estates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Currencies
{
    public interface ICurrencyService 
    {
        //ileride serviste bu imzalar degisebilecegi icin ayrı ayrı tanimlandi
        Task<IEnumerable<ReadCurrencyDto>> GelAllCurrenciesAsync(bool trackChanges);
        Task<ReadCurrencyDto> GetOneCurrencyByIdAsync(int id, bool trackChanges);
        Task<ReadCurrencyDto> GetOneCurrencyByCodeAsync(string code, bool trackChanges);

        Task<ReadCurrencyDto> CreateOneCurrencyAsync(CreateCurrencyDto currencyDto);
        Task UpdateOneCurrencyAsync(int id, UpdateCurrencyDto currencyDto, bool trackChanges);
        Task DeleteOneCurrencyAsync(int id, bool trackChanges);
    }
}
