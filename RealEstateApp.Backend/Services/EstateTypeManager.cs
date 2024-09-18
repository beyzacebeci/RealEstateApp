using AutoMapper;
using Entities.DataTransferObjects.EstateTypes;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts.EstateTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class EstateTypeManager : IEstateTypeService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public EstateTypeManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReadEstateTypeDto>> GetAllEstateTypesAsync(bool trackChanges)
        {
            var estateTypes = await _repositoryManager.EstateTypeRepository.GetAllEstateTypesAsync(trackChanges);
            return _mapper.Map<IEnumerable<ReadEstateTypeDto>>(estateTypes);
        }

        public async Task<ReadEstateTypeDto> GetOneEstateTypeByIdAsync(int id, bool trackChanges)
        {
            var estateType = await _repositoryManager.EstateTypeRepository.GetOneEstateTypeByIdAsync(id, trackChanges);
            return _mapper.Map<ReadEstateTypeDto>(estateType);

        }
        public async Task<ReadEstateTypeDto> CreateOneEstateTypeAsync(CreateEstateTypeDto estateTypeDto)
        {

            if (estateTypeDto is null) throw new ArgumentNullException(nameof(estateTypeDto));

            var entity = _mapper.Map<EstateType>(estateTypeDto);
            _repositoryManager.EstateTypeRepository.CreateOneEstateTypeAsync(entity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ReadEstateTypeDto>(entity);
        }

        public async Task UpdateOneEstateTypeAsync(int id, UpdateEstateTypeDto estateTypeDto, bool trackChanges)
        {
            //check entity 
            var entity = await _repositoryManager.EstateTypeRepository.GetOneEstateTypeByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"EstateType with id:{id} could not found");

            //check params
            if (estateTypeDto == null)
                throw new ArgumentNullException(nameof(estateTypeDto));

            //mapping
            entity = _mapper.Map<EstateType>(estateTypeDto);
   
            _repositoryManager.EstateTypeRepository.Update(entity);
            await _repositoryManager.SaveAsync();
        }

        public async Task DeleteOneEstateTypeAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.EstateTypeRepository.GetOneEstateTypeByIdAsync(id, trackChanges);
           
            if (entity == null)
                throw new Exception($"EstateType with id:{id} could not found");

            _repositoryManager.EstateTypeRepository.DeleteOneEstateTypeAsync(entity);
            await _repositoryManager.SaveAsync();
        }
    }
}
