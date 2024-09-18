using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.Estates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Estates
{
    public class EstateRepository : RepositoryBase<Estate>, IEstateRepository
    {
        public EstateRepository(RepositoryContext context) : base(context)
        {
        }
        //estateParameters.PageNumber-1)*estateParameters.PageSize atlanması gereken kayit sayisi
        //estateParameters.PageSize alınmasi gereken kayit sayisi
        public async Task<PagedList<Estate>> GetAllEstatesAsync(EstateParameters estateParameters, bool trackChanges)
        {
            var estatesQuery = FindByCondition(e =>
                ((e.Price.Amount >= estateParameters.MinPrice) &&
                (e.Price.Amount <= estateParameters.MaxPrice)) &&
                (estateParameters.MinStartDate == null || e.StartDate >= estateParameters.MinStartDate) &&
                (estateParameters.MaxEndDate == null || e.EndDate <= estateParameters.MaxEndDate)
                , trackChanges)
            .Where(e => !e.IsDeleted);

            if (estateParameters.EstateTypeNames.Any())
            {
                estatesQuery = estatesQuery
                    .Where(e => estateParameters.EstateTypeNames.Contains(e.Type.Name)); // EstateTypeName'e göre filtreleme
            }
            if (estateParameters.EstateStatusNames.Any())
            {
                estatesQuery = estatesQuery
                    .Where(e => estateParameters.EstateStatusNames.Contains(e.Status.Status)); // EstateStatusName'e göre filtreleme
            }

            var estates = await estatesQuery
                .Include(e => e.Status)
                .Include(e => e.Type)
                .Include(e => e.Price)
                .ThenInclude(p => p.Currency)
                .Include(p => p.Photos)
                .ToListAsync();

            return PagedList<Estate>
                .ToPagedList(estates, estateParameters.PageNumber, estateParameters.PageSize);
        }




        public async Task<IEnumerable<Estate>> GetAllEstatesNoPaginationAsync(bool trackChanges) =>
                await FindAll(trackChanges)
                    .Where(e => !e.IsDeleted)
                    .Include(p => p.Status)
                    .Include(p => p.Type)
                     .Include(e => e.Price)
                      .ThenInclude(p => p.Currency)
                    .ToListAsync();

        public async Task<Estate> GetOneEstateByIdAsync(int id, bool trackChanges) =>
            await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges)
            .Include(e => e.Price)
            .ThenInclude(p => p.Currency)
            .Include(e => e.Status)
            .Include(e => e.Type)
            .SingleOrDefaultAsync();
        public async Task<Dictionary<int, int>> GetEstateCountsByTypeAsync(bool trackChanges)
        {
            var estateCounts = await FindAll(trackChanges)
                .Where(e => !e.IsDeleted)
                .GroupBy(e => e.EstateTypeId)
                .Select(g => new
                {
                    EstateTypeId = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(x => x.EstateTypeId, x => x.Count);

            return estateCounts;
        }
        public void CreateOneEstateAsync(Estate estate) => Create(estate);

        public void DeleteOneEstateAsync(Estate estate)=> Delete(estate);

        public void UpdateOneEstateAsync(Estate estate)=> Update(estate);

        public async Task<IEnumerable<Estate>> GetAllEstatesWithUserIdAsync(string userId,bool trackChanges) =>        
            await FindByCondition(e => e.UserId.Equals(userId) && !e.IsDeleted, trackChanges)
                    .Include(p => p.Status)
                    .Include(p => p.Type)
                    .Include(e => e.Price)
                    .ThenInclude(p => p.Currency)
                    .Include(p => p.Photos)
                    .ToListAsync();
    }
}
