using Entities.Models;
using Repositories.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.EstateStatuses
{
    public interface IEstateStatusRepository : IRepositoryBase<EstateStatus>
    {
        Task<IEnumerable<EstateStatus>> GetAllEstateStatusesAsync(bool trackChanges);
        Task<EstateStatus> GetOneEstateStatusByIdAsync(int id, bool trackChanges);
        void CreateOneEstateStatusAsync(EstateStatus estateStatus);
        void UpdateOneEstateStatusAsync(EstateStatus estateStatus);
        void DeleteOneEstateStatusAsync(EstateStatus estateStatus);
    }
}
