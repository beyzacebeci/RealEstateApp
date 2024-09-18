using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects.Currencies
{
    public class ReadCurrencyDto
    {
        public int Id { get; set; } 
        public string? CurrencyName { get; set; }
        public string? Code { get; set; }


    }
}
