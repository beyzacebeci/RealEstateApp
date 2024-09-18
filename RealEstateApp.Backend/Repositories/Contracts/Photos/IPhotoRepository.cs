using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Contracts.Photos
{
    public interface IPhotoRepository : IRepositoryBase<Photo>
    {

        Task<IEnumerable<Photo>> GetAllPhotosAsync(bool trackChanges);
        Task<IEnumerable<Photo>> GetAllPhotosOneEstateAsync(int id,bool trackChanges);
        Task<Photo> GetOnePhotoByIdAsync(int id, bool trackChanges);  
        void CreateOnePhotoAsync(Photo photo);
        void UpdateOnePhotoAsync(Photo photo);
        void DeleteOnePhotoAsync(Photo photo);

    }
}
