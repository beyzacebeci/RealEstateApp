using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.Currencies
{
    public interface ICurrencyRepository : IRepositoryBase<Currency>
    {
        //currency olusturmanin mantigi basedeki cruddan farklı olabileceği icin tekrar yazildi
        Task<IEnumerable<Currency>> GetAllCurrenciesAsync(bool trackChanges);
        Task<Currency> GetOneCurrencyByIdAsync(int id, bool trackChanges);
        Task<Currency> GetOneCurrencyByCodeAsync(string code, bool trackChanges);
        void CreateOneCurrencyAsync(Currency currency);
        void UpdateOneCurrencyAsync(Currency currency);
        void DeleteOneCurrencyAsync(Currency currency);
    }
}
