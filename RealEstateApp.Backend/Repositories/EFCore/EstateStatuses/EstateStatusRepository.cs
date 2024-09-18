using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.EstateStatuses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.EstateStatuses
{
    public class EstateStatusRepository : RepositoryBase<EstateStatus>, IEstateStatusRepository
    {
        public EstateStatusRepository(RepositoryContext context) : base(context)
        {
        }
        public async Task<IEnumerable<EstateStatus>> GetAllEstateStatusesAsync(bool trackChanges) =>
            await FindAll(trackChanges).Where(e => !e.IsDeleted).ToListAsync();

        public async Task<EstateStatus> GetOneEstateStatusByIdAsync(int id, bool trackChanges) =>
            await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges)
            .SingleOrDefaultAsync();
        public void CreateOneEstateStatusAsync(EstateStatus estateStatus) => Create(estateStatus);
        public void DeleteOneEstateStatusAsync(EstateStatus estateStatus) => Delete(estateStatus);
        public void UpdateOneEstateStatusAsync(EstateStatus estateStatus) => Update(estateStatus);


    }
}
