using Entities.DataTransferObjects.Estates;
using Entities.DataTransferObjects.Prices;
using Entities.Models;
using Entities.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Estates
{
    public interface IEstateService
    {
        //ileride serviste bu imzalar degisebilecegi icin ayrı ayrı tanimlandi
        Task<(IEnumerable<ReadEstateDto> estates,MetaData metaData)> GelAllEstatesAsync(EstateParameters estateParameters, bool trackChanges);
        Task<IEnumerable<ReadEstateDto>> GelAllEstatesNoPaginationAsync(bool trackChanges);
        Task<ReadEstateDto> GetOneEstateByIdAsync(int id, bool trackChanges);
        Task<ReadEstateDto> CreateOneEstateAsync(CreateEstateDto estateDto);
        Task UpdateOneEstateAsync(int id, UpdateEstateDto estateDto, bool trackChanges);
        Task DeleteOneEstateAsync(int id, bool trackChanges);
        Task<int> GetTotalEstatesCountAsync(bool trackChanges);
        //Task<EstateTypeCountDto> GetEstateCountByTypeAsync(int estateTypeId, bool trackChanges);
        Task<IEnumerable<EstateTypeCountDto>> GetAllEstateTypesWithCountsAsync(bool trackChanges);
        Task<IEnumerable<ReadEstateDto>> GelAllEstatesWithUserIdAsync(string userId,bool trackChanges);



    }



}

