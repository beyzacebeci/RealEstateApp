using Entities.Models;
using Entities.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.Estates
{
    public interface IEstateRepository : IRepositoryBase<Estate>
    {
        //estate olusturmanin mantigi basedeki creatupdate deleteden farklı olabileceği icin yazildi
        Task<PagedList<Estate>> GetAllEstatesAsync(EstateParameters estateParameters,bool trackChanges);
        Task<IEnumerable<Estate>> GetAllEstatesNoPaginationAsync(bool trackChanges);
        Task<Estate> GetOneEstateByIdAsync(int id,bool trackChanges);
        void CreateOneEstateAsync(Estate estate);
        void UpdateOneEstateAsync(Estate estate);
        void DeleteOneEstateAsync(Estate estate);
        Task<Dictionary<int, int>> GetEstateCountsByTypeAsync(bool trackChanges);
        Task<IEnumerable<Estate>> GetAllEstatesWithUserIdAsync(string userId,bool trackChanges);


    }
}
