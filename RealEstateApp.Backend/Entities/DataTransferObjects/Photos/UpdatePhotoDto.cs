using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects.Photos
{
    public class UpdatePhotoDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string Base64Image { get; set; }
        public int EstateId { get; set; }

        public string? FileExtension { get; set; }

        //public string Estate { get; set; }
    }
}
