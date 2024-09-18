namespace Entities.DataTransferObjects.Estates
{
    public class ReadEstateDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int EstateTypeId { get; set; }
        public int EstateStatusId { get; set; }
        public int EstatePriceId { get; set; }
        public string TypeName { get; set; }
        public string StatusName { get; set; }
        public double PriceAmount{ get; set; }
        public string PriceCurrencyCode { get; set; }
        public string EstateFirstImage { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string? UserId { get; set; }





    }
}
