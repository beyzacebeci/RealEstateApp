using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.Prices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Prices
{
    public class PriceRepository : RepositoryBase<Price>, IPriceRepository
    {
        public PriceRepository(RepositoryContext context) : base(context)
        {

        }
        public async Task<IEnumerable<Price>> GetAllPricesAsync(bool trackChanges) =>
                await FindAll(trackChanges)
                    .Where(e => !e.IsDeleted)
                    .Include(p => p.Currency)
                    .ToListAsync();

        public async Task<Price> GetOnePriceByIdAsync(int id, bool trackChanges) =>
            await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges).Include(p=>p.Currency)
            .SingleOrDefaultAsync();
        public void CreateOnePriceAsync(Price price) => Create(price);
        public void DeleteOnePriceAsync(Price price) => Delete(price);
        public void UpdateOnePriceAsync(Price price) => Update(price);
    }
}

