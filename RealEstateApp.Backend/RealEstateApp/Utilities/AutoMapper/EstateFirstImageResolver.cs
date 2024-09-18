using AutoMapper;
using Entities.DataTransferObjects.Estates;
using Entities.Models;

namespace RealEstateApp.Utilities.AutoMapper
{
    public class EstateFirstImageResolver : IValueResolver<Estate, ReadEstateDto, string>
    {
        public string Resolve(Estate source, ReadEstateDto destination, string destMember, ResolutionContext context)
        {
            // Silinmemiş fotoğrafları filtreleyin ve ilk fotoğrafı alın
            var firstImage = source.Photos
                ?.Where(p => !p.IsDeleted)  // Silinmemiş fotoğrafları seçin
                .OrderBy(p => p.Id)         // ID'ye göre sıralayın
                .FirstOrDefault();          // İlk fotoğrafı alın

            return firstImage?.Base64Image ?? string.Empty;  // Eğer fotoğraf varsa Base64Image'ı döndürün, yoksa boş string döndür
        }
    }
}