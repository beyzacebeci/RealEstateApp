using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Estate: BaseEntity
    {
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int EstateTypeId { get; set; }
        public int EstateStatusId { get; set; }
        public int PriceId { get; set; }
        public Price? Price { get; set; }
        public EstateType? Type { get; set; }
        public EstateStatus? Status { get; set; }
        public ICollection<Photo>? Photos { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }


    }
}
