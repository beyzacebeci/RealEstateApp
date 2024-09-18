using Entities.DataTransferObjects.EstateStatuses;
using Entities.DataTransferObjects.EstateTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.EstateStatuses
{
    public interface IEstateStatusService
    {
        Task<IEnumerable<ReadEstateStatusDto>> GetAllEstateStatusesAsync(bool trackChanges);
        Task<ReadEstateStatusDto> GetOneEstateStatusByIdAsync(int id, bool trackChanges);
        Task<ReadEstateStatusDto> CreateOneEstateStatusAsync(CreateEstateStatusDto estateStatusDto);
        Task UpdateOneEstateStatusAsync(int id, UpdateEstateStatusDto estateStatusDto, bool trackChanges);
        Task DeleteOneEstateStatusAsync(int id, bool trackChanges);
    }
}
