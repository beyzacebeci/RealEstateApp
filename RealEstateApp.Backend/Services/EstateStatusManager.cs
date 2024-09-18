using AutoMapper;
using Entities.DataTransferObjects.EstateStatuses;
using Entities.DataTransferObjects.EstateTypes;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts.EstateStatuses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class EstateStatusManager : IEstateStatusService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public EstateStatusManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReadEstateStatusDto>> GetAllEstateStatusesAsync(bool trackChanges)
        {
            var estateStatuses = await _repositoryManager.EstateStatusRepository.GetAllEstateStatusesAsync(trackChanges);
            return _mapper.Map<IEnumerable<ReadEstateStatusDto>>(estateStatuses);
        }

        public async Task<ReadEstateStatusDto> GetOneEstateStatusByIdAsync(int id, bool trackChanges)
        {
            var estateStatus = await _repositoryManager.EstateStatusRepository.GetOneEstateStatusByIdAsync(id, trackChanges);
            return _mapper.Map<ReadEstateStatusDto>(estateStatus);

        }
        public async Task<ReadEstateStatusDto> CreateOneEstateStatusAsync(CreateEstateStatusDto estateStatusDto)
        {

            if (estateStatusDto is null) throw new ArgumentNullException(nameof(estateStatusDto));

            var entity = _mapper.Map<EstateStatus>(estateStatusDto);
            _repositoryManager.EstateStatusRepository.CreateOneEstateStatusAsync(entity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ReadEstateStatusDto>(entity);
        }

        public async Task UpdateOneEstateStatusAsync(int id, UpdateEstateStatusDto estateStatusDto, bool trackChanges)
        {
            //check entity 
            var entity = await _repositoryManager.EstateStatusRepository.GetOneEstateStatusByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"EstateStatus with id:{id} could not found");

            //check params
            if (estateStatusDto == null)
                throw new ArgumentNullException(nameof(estateStatusDto));

            //mapping
            entity = _mapper.Map<EstateStatus>(estateStatusDto);

            _repositoryManager.EstateStatusRepository.Update(entity);
            await _repositoryManager.SaveAsync();
        }

        public async Task DeleteOneEstateStatusAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.EstateStatusRepository.GetOneEstateStatusByIdAsync(id, trackChanges);

            if (entity == null)
                throw new Exception($"EstateStatus with id:{id} could not found");

            _repositoryManager.EstateStatusRepository.DeleteOneEstateStatusAsync(entity);
            await _repositoryManager.SaveAsync();
        }

    }
}
