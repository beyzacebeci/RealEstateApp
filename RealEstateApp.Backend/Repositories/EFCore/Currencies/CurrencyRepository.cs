using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.Currencies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Currencies
{
    public class CurrencyRepository : RepositoryBase<Currency>, ICurrencyRepository
    {
        public CurrencyRepository(RepositoryContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Currency>> GetAllCurrenciesAsync(bool trackChanges) =>
            await FindAll(trackChanges).Where(e => !e.IsDeleted).ToListAsync();

        public async Task<Currency> GetOneCurrencyByIdAsync(int id, bool trackChanges) =>
            await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges)
            .SingleOrDefaultAsync();

        public async Task<Currency> GetOneCurrencyByCodeAsync(string code, bool trackChanges) =>
    await FindByCondition(e => e.Code.Equals(code) && !e.IsDeleted, trackChanges)
    .SingleOrDefaultAsync();

        public void CreateOneCurrencyAsync(Currency currency) => Create(currency);

        public void DeleteOneCurrencyAsync(Currency currency) => Delete(currency);

        public void UpdateOneCurrencyAsync(Currency currency) => Update(currency);
    }
}
