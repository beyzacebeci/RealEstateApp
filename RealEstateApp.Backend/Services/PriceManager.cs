using AutoMapper;
using Entities.DataTransferObjects.Estates;
using Entities.DataTransferObjects.Prices;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts.Prices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PriceManager : IPriceService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PriceManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReadPriceDto>> GelAllPricesAsync(bool trackChanges)
        {
            var prices = await _repositoryManager.PriceRepository.GetAllPricesAsync(trackChanges);

            return _mapper.Map<IEnumerable<ReadPriceDto>>(prices);
        }

        public async Task<ReadPriceDto> GetOnePriceByIdAsync(int id, bool trackChanges)
        {
            var estate = await _repositoryManager.PriceRepository.GetOnePriceByIdAsync(id, trackChanges);
            return _mapper.Map<ReadPriceDto>(estate);
        }

        public async Task<ReadPriceDto> CreateOnePriceAsync(CreatePriceDto priceDto)
        {
            if (priceDto == null)
            {
                throw new ArgumentNullException(nameof(priceDto));
            }

            var entity = _mapper.Map<Price>(priceDto);
            _repositoryManager.PriceRepository.CreateOnePriceAsync(entity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ReadPriceDto>(entity);
        }
        public async Task UpdateOnePriceAsync(int id, UpdatePriceDto priceDto, bool trackChanges)
        {
            //check entity 
            var entity = await _repositoryManager.PriceRepository.GetOnePriceByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Price with id:{id} could not found");

            //check params
            if (priceDto == null)
                throw new ArgumentNullException(nameof(priceDto));

            //mapping
            entity = _mapper.Map<Price>(priceDto);

            _repositoryManager.PriceRepository.Update(entity);
            await _repositoryManager.SaveAsync();
        }
        public async Task DeleteOnePriceAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.PriceRepository.GetOnePriceByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Price with id:{id} could not found");

            _repositoryManager.PriceRepository.DeleteOnePriceAsync(entity);
            await _repositoryManager.SaveAsync();
        }


    }
}

