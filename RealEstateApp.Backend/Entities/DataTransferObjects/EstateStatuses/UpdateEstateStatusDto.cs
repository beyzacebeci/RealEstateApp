using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects.EstateStatuses
{
    public class UpdateEstateStatusDto
    {
        public int Id { get; set; }
        public string? Status { get; set; }
    }
}
