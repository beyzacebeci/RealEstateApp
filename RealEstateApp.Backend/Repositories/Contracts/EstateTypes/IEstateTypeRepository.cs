using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.EstateTypes
{
    public interface IEstateTypeRepository : IRepositoryBase<EstateType>
    {
        Task<IEnumerable<EstateType>> GetAllEstateTypesAsync(bool trackChanges);
        Task<EstateType> GetOneEstateTypeByIdAsync(int id, bool trackChanges);
        void CreateOneEstateTypeAsync(EstateType estate);
        void UpdateOneEstateTypeAsync(EstateType estate);
        void DeleteOneEstateTypeAsync(EstateType estate);
    }
}
