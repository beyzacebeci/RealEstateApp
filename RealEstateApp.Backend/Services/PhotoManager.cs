using AutoMapper;
using Entities.DataTransferObjects.Currencies;
using Entities.DataTransferObjects.Photos;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PhotoManager : IPhotoService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PhotoManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReadPhotoDto>> GetAllPhotosAsync(bool trackChanges)
        {
            var photos = await _repositoryManager.PhotoRepository.GetAllPhotosAsync(trackChanges);
            return _mapper.Map<IEnumerable<ReadPhotoDto>>(photos);
        }

        public async Task<IEnumerable<ReadPhotoDto>> GetAllPhotosOneEstateAsync(int id,bool trackChanges)
        {
            var photos = await _repositoryManager.PhotoRepository.GetAllPhotosOneEstateAsync(id,trackChanges);
            return _mapper.Map<IEnumerable<ReadPhotoDto>>(photos);  
        }

        public async Task<ReadPhotoDto> GetOnePhotoByIdAsync(int id, bool trackChanges)
        {
            var photo = await _repositoryManager.PhotoRepository.GetOnePhotoByIdAsync(id, trackChanges);
            return _mapper.Map<ReadPhotoDto>(photo);
        }

        public async Task<ReadPhotoDto> CreateOnePhotoAsync(CreatePhotoDto photoDto)
        {
            if (photoDto == null)
            {
                throw new ArgumentNullException(nameof(photoDto));
            }

            var entity = _mapper.Map<Photo>(photoDto);
            _repositoryManager.PhotoRepository.CreateOnePhotoAsync(entity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ReadPhotoDto>(entity);
        }
        public async Task UpdateOnePhotoAsync(int id, UpdatePhotoDto photoDto, bool trackChanges)
        {
            //check entity 
            var entity = await _repositoryManager.PhotoRepository.GetOnePhotoByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Photo with id:{id} could not found");

            //check params
            if (photoDto == null)
                throw new ArgumentNullException(nameof(photoDto));

            //mapping
            entity = _mapper.Map<Photo>(photoDto);

            _repositoryManager.PhotoRepository.Update(entity);
            await _repositoryManager.SaveAsync();
        }
        public async Task DeleteOnePhotoAsync(int id, bool trackChanges)
        {
            var entity = await _repositoryManager.PhotoRepository.GetOnePhotoByIdAsync(id, trackChanges);
            if (entity == null)
                throw new Exception($"Photo with id:{id} could not found");

            _repositoryManager.PhotoRepository.DeleteOnePhotoAsync(entity);
            await _repositoryManager.SaveAsync();
        }
   

    }
}
