using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.Prices
{
    public interface IPriceRepository : IRepositoryBase<Price>
    {
        Task<IEnumerable<Price>> GetAllPricesAsync(bool trackChanges);
        Task<Price> GetOnePriceByIdAsync(int id, bool trackChanges);
        void CreateOnePriceAsync(Price price);
        void UpdateOnePriceAsync(Price price);
        void DeleteOnePriceAsync(Price price);
    }
}
