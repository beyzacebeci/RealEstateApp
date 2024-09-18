using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Photo : BaseEntity
    {
        public string? Description { get; set; }
        public string Base64Image { get; set; }
        public string? FileExtension { get; set; }
        public int EstateId { get; set; }
        public Estate? Estate { get; set; }
    }
}
