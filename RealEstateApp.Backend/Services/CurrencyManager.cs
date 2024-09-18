using AutoMapper;
using Entities.DataTransferObjects.Currencies;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts.Currencies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CurrencyManager : ICurrencyService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CurrencyManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReadCurrencyDto>> GelAllCurrenciesAsync(bool trackChanges)
        {
            var estates = await _repositoryManager.CurrencyRepository.GetAllCurrenciesAsync(trackChanges);
            return _mapper.Map<IEnumerable<ReadCurrencyDto>>(estates);
        }

        public async Task<ReadCurrencyDto> GetOneCurrencyByIdAsync(int id, bool trackChanges)
        {
            var estate = await _repositoryManager.CurrencyRepository.GetOneCurrencyByIdAsync(id, trackChanges);
            return _mapper.Map<ReadCurrencyDto>(estate);
        }
        public async Task<ReadCurrencyDto> GetOneCurrencyByCodeAsync(string code, bool trackChanges)
        {
            var estate = await _repositoryManager.CurrencyRepository.GetOneCurrencyByCodeAsync(code, trackChanges);
            return _mapper.Map<ReadCurrencyDto>(estate);
        }

        public async Task<ReadCurrencyDto> CreateOneCurrencyAsync(CreateCurrencyDto currencyDto)
        {
            if (currencyDto == null)
            {
                throw new ArgumentNullException(nameof(currencyDto));
            }

            var entity = _mapper.Map<Currency>(currencyDto);
            _repositoryManager.CurrencyRepository.CreateOneCurrencyAsync(entity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ReadCurrencyDto>(entity);
        }
        public async Task UpdateOneCurrencyAsync(int id, UpdateCurrencyDto currencyDto, bool trackChanges)
        {
            //check entity 
            var entity = await _repositoryManager.CurrencyRepository.GetOneCurrencyByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Currency with id:{id} could not found");

            //check params
            if (currencyDto == null)
                throw new ArgumentNullException(nameof(currencyDto));

            //mapping
            entity = _mapper.Map<Currency>(currencyDto);

            _repositoryManager.CurrencyRepository.Update(entity);
            await _repositoryManager.SaveAsync();
        }
        public async Task DeleteOneCurrencyAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.CurrencyRepository.GetOneCurrencyByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Currency with id:{id} could not found");

            _repositoryManager.CurrencyRepository.DeleteOneCurrencyAsync(entity);
            await _repositoryManager.SaveAsync();
        }
    }
}
