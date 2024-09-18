using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects.Estates
{
    public class UpdateEstateDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int EstateTypeId { get; set; }
        public int EstateStatusId { get; set; }
        public string CurrencyCode { get; set; }
        public double? EstatePriceAmount { get; set; }
        public string? City { get; set; }
        public string? District { get; set; }


    }

}
