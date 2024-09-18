using Microsoft.OpenApi.Models;
using NSwag.Annotations;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.RequestFeatures
{
    public class EstateParameters : RequestParameters
    {
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; } = double.MaxValue;
        public bool ValidPriceRange => MaxPrice > MinPrice;
        public List<string> EstateTypeNames { get; set; } = new List<string>(); // Birden fazla ID için liste
        public List<string> EstateStatusNames { get; set; } = new List<string>(); // Birden fazla ID için liste
        public DateTime? MinStartDate { get; set; }
        public DateTime? MaxEndDate { get; set; }   



    }
}
