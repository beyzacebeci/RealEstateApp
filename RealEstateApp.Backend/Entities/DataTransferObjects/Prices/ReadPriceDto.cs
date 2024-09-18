using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects.Prices
{
    public class ReadPriceDto
    {
        public int Id { get; set; }
        public double? Amount { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencyName {  get; set; }
        public string CurrencyCode { get; set; }
    }
}
