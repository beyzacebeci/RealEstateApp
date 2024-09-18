using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Price : BaseEntity
    {
        public double? Amount { get; set; }
        public int CurrencyId { get; set; }
        public Currency? Currency { get; set; }
        public Estate Estate { get; set; }
    }
}
