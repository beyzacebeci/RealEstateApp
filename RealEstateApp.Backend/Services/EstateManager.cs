using AutoMapper;
using AutoMapper.Execution;
using Entities.DataTransferObjects.Estates;
using Entities.DataTransferObjects.Prices;
using Entities.Models;
using Entities.RequestFeatures;
using Repositories.Contracts;
using Services.Contracts.Estates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class EstateManager : IEstateService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public EstateManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }


        public async Task<IEnumerable<ReadEstateDto>> GelAllEstatesNoPaginationAsync(bool trackChanges)
        {
            var estates = await _repositoryManager.EstateRepository.GetAllEstatesNoPaginationAsync(trackChanges);

            return _mapper.Map<IEnumerable<ReadEstateDto>>(estates);
        }


        public async Task<(IEnumerable<ReadEstateDto> estates, MetaData metaData)>
                GelAllEstatesAsync(EstateParameters estateParameters, bool trackChanges)
        {
            if (!estateParameters.ValidPriceRange)
                throw new ArgumentException("Geçersiz fiyat aralığı.", nameof(estateParameters));

            var estateswithMetaData = await _repositoryManager
                .EstateRepository
                .GetAllEstatesAsync(estateParameters, trackChanges);

            var estatesDto = _mapper.Map<IEnumerable<ReadEstateDto>>(estateswithMetaData);

            return (estatesDto, estateswithMetaData.MetaData);
        }

        public async Task<ReadEstateDto> GetOneEstateByIdAsync(int id, bool trackChanges)
        {
            var estate = await _repositoryManager.EstateRepository.GetOneEstateByIdAsync(id, trackChanges);
            return _mapper.Map<ReadEstateDto>(estate);
        }

        public async Task<ReadEstateDto> CreateOneEstateAsync(CreateEstateDto estateDto)
        {
            if (estateDto == null)
            {
                throw new ArgumentNullException(nameof(estateDto));
            }

            // 1. Adım: Price oluşturma
            var priceEntity = new Price
            {
                Amount = estateDto.EstatePriceAmount,
                CurrencyId = estateDto.CurrencyId
            };
            _repositoryManager.PriceRepository.CreateOnePriceAsync(priceEntity);
            await _repositoryManager.SaveAsync();

            // 2. Adım: Price ID'sini al
            var priceId = priceEntity.Id;

            // 3. Adım: Estate oluşturma
            var estateEntity = new Estate
            {
                Title = estateDto.Title,
                StartDate = estateDto.StartDate,
                EndDate = estateDto.EndDate,
                EstateTypeId = estateDto.EstateTypeId,
                EstateStatusId = estateDto.EstateStatusId,
                PriceId = priceId, // Price ID'sini burada kullanıyoruz
                City = estateDto.City,
                District = estateDto.District,
                UserId = estateDto.UserId,
            };
            _repositoryManager.EstateRepository.CreateOneEstateAsync(estateEntity);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<ReadEstateDto>(estateEntity);
        }

        public async Task UpdateOneEstateAsync(int id, UpdateEstateDto estateDto, bool trackChanges)
        {
            // Check if the estate entity exists
            var entity = await _repositoryManager.EstateRepository.GetOneEstateByIdAsync(id, trackChanges);
            var price = await _repositoryManager.PriceRepository.GetOnePriceByIdAsync(entity.PriceId,trackChanges);
            //new
            var currencyyyy = await _repositoryManager.CurrencyRepository.GetOneCurrencyByIdAsync(price.CurrencyId, trackChanges);

            if (entity == null)
                throw new Exception($"Estate with id:{id} could not be found");
            if (price == null)
                throw new Exception($"Price with id:{id} could not be found");
     
       
            // Check if the DTO is null
            if (estateDto == null)
                throw new ArgumentNullException(nameof(estateDto));

            // Update the Price entity if EstatePriceAmount is provided
            if (estateDto.EstatePriceAmount.HasValue)
            {
                if (price != null)
                {
                    price.Amount = estateDto.EstatePriceAmount.Value;

                    var currency = await _repositoryManager.CurrencyRepository.GetOneCurrencyByCodeAsync(estateDto.CurrencyCode, trackChanges);
                    if (currency == null)
                        throw new Exception($"Currency with code:{estateDto.CurrencyCode} could not be found");

                    price.CurrencyId = currency.Id;
                    _repositoryManager.PriceRepository.Update(price);

                }
                else
                {
                    throw new Exception($"Price with id:{entity.PriceId} could not be found");
                }

                //  ben dto üzerinden currencycode bilgisini değiştimek istiyorum.
                //  ama bu değiştiğinde price tablosundaki currency ıd de değiştirilen currency code
                //  bilgisinin idsi ile değişmeli 
            }

         
            entity.Title = estateDto.Title;
            entity.StartDate  = estateDto.StartDate;
            entity.EndDate = estateDto.EndDate;
            entity.EstateTypeId = estateDto.EstateTypeId;
            entity.EstateStatusId = estateDto.EstateStatusId;
            entity.Price.Amount = estateDto.EstatePriceAmount;
            entity.City = estateDto.City;
            entity.District = estateDto.District;
            //entity.Price.Currncy.Code = estateDto.CurrencyCode;
        
            _repositoryManager.EstateRepository.Update(entity);

            // Save changes
            await _repositoryManager.SaveAsync();
        }

        public async Task DeleteOneEstateAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.EstateRepository.GetOneEstateByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Estate with id:{id} could not found");

            // Fetch associated photos
            var photos = await _repositoryManager.PhotoRepository.GetAllPhotosOneEstateAsync(id, trackChanges);

            // Mark photos as deleted
            foreach (var photo in photos)
            {
                photo.IsDeleted = true;
                _repositoryManager.PhotoRepository.Update(photo);
            }

            // Mark the estate as deleted
            entity.IsDeleted = true;
            _repositoryManager.EstateRepository.Update(entity);

            // Save changes
            await _repositoryManager.SaveAsync();
        }


        public async Task<int> GetTotalEstatesCountAsync(bool trackChanges)
        {
            // Total count calculation
            var estates = await _repositoryManager.EstateRepository.GetAllEstatesNoPaginationAsync(trackChanges);
            return estates.Count();
        }

        public async Task<IEnumerable<EstateTypeCountDto>> GetAllEstateTypesWithCountsAsync(bool trackChanges)
        {
            var estateTypes = await _repositoryManager.EstateTypeRepository.GetAllEstateTypesAsync(trackChanges);
            var estateCounts = await _repositoryManager.EstateRepository.GetEstateCountsByTypeAsync(trackChanges);


            var result = estateTypes.Select(et => new EstateTypeCountDto
            {
                EstateTypeName = et.Name,
                Count = estateCounts.ContainsKey(et.Id) ? estateCounts[et.Id] : 0
            });

            return result;
        }


        public async Task<IEnumerable<ReadEstateDto>> GelAllEstatesWithUserIdAsync(string userId,bool trackChanges)
        {
            var estates = await _repositoryManager.EstateRepository.GetAllEstatesWithUserIdAsync(userId,trackChanges);

            return _mapper.Map<IEnumerable<ReadEstateDto>>(estates);
        }

    }
}
