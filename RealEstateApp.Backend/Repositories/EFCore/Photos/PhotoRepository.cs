using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Photos
{
    public class PhotoRepository:RepositoryBase<Photo>, IPhotoRepository
    {
    public PhotoRepository(RepositoryContext context) : base(context)
    {
       
    }
    public async Task<IEnumerable<Photo>> GetAllPhotosAsync(bool trackChanges) =>
            await FindAll(trackChanges).Where(e => !e.IsDeleted).ToListAsync();
       
        public async Task<IEnumerable<Photo>> GetAllPhotosOneEstateAsync(int id, bool trackChanges)
        {

            var estatephotos= await 
                FindByCondition(p=>p.EstateId == id,trackChanges)
                .Where(e => !e.IsDeleted)
                .ToListAsync();

            return estatephotos;
        }

        public async Task<Photo> GetOnePhotoByIdAsync(int id, bool trackChanges) =>
    await FindByCondition(e => e.Id.Equals(id) && !e.IsDeleted, trackChanges)
    .SingleOrDefaultAsync();

        public void CreateOnePhotoAsync(Photo photo) => Create(photo);
        public void DeleteOnePhotoAsync(Photo photo) => Delete(photo);
        public void UpdateOnePhotoAsync(Photo photo) => Update(photo);

    }
}
