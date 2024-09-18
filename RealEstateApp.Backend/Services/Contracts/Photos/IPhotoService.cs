using Entities.DataTransferObjects.Currencies;
using Entities.DataTransferObjects.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Photos
{
    public interface IPhotoService
    {
        //ileride serviste bu imzalar degisebilecegi icin ayrı ayrı tanimlandi
        Task<IEnumerable<ReadPhotoDto>> GetAllPhotosAsync(bool trackChanges);
        Task<IEnumerable<ReadPhotoDto>> GetAllPhotosOneEstateAsync(int id,bool trackChanges);

        Task<ReadPhotoDto> GetOnePhotoByIdAsync(int id, bool trackChanges);
        Task<ReadPhotoDto> CreateOnePhotoAsync(CreatePhotoDto photoDto);
        Task UpdateOnePhotoAsync(int id, UpdatePhotoDto photoDto, bool trackChanges);
        Task DeleteOnePhotoAsync(int id, bool trackChanges);

    }
}
