using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.EstateTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.EstateTypes
{
    public class EstateTypeRepository : RepositoryBase<EstateType>,IEstateTypeRepository
    {
        public EstateTypeRepository(RepositoryContext context) : base(context)
        {

        }
        public async Task<IEnumerable<EstateType>> GetAllEstateTypesAsync(bool trackChanges) =>
                await FindAll(trackChanges).Where(e => !e.IsDeleted).ToListAsync();

        public async Task<EstateType> GetOneEstateTypeByIdAsync(int id, bool trackChanges) =>
            await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges)
            .SingleOrDefaultAsync();
        public void CreateOneEstateTypeAsync(EstateType estateType) => Create(estateType);

        public void DeleteOneEstateTypeAsync(EstateType estateType) => Delete(estateType);

        public void UpdateOneEstateTypeAsync(EstateType estateType) => Update(estateType);
    }
}
