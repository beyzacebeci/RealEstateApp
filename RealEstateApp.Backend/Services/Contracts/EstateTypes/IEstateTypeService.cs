using Entities.DataTransferObjects.EstateTypes;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.EstateTypes
{
    public interface IEstateTypeService
    {
        Task<IEnumerable<ReadEstateTypeDto>> GetAllEstateTypesAsync(bool trackChanges);
        Task<ReadEstateTypeDto> GetOneEstateTypeByIdAsync(int id, bool trackChanges);
        Task<ReadEstateTypeDto> CreateOneEstateTypeAsync(CreateEstateTypeDto estateTypeDto);
        Task UpdateOneEstateTypeAsync(int id, UpdateEstateTypeDto estateTypeDto, bool trackChanges);
        Task DeleteOneEstateTypeAsync(int id, bool trackChanges);
    }
}
