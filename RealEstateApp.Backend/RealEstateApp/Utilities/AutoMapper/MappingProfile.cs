using AutoMapper;
using Entities.DataTransferObjects.Currencies;
using Entities.DataTransferObjects.Estates;
using Entities.DataTransferObjects.EstateStatuses;
using Entities.DataTransferObjects.EstateTypes;
using Entities.DataTransferObjects.Photos;
using Entities.DataTransferObjects.Prices;
using Entities.DataTransferObjects.Users;
using Entities.Models;

namespace RealEstateApp.Utilities.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UpdateEstateTypeDto, EstateType>().ReverseMap();
            CreateMap<EstateType,ReadEstateTypeDto >();
            CreateMap<CreateEstateTypeDto, EstateType>();
            
            CreateMap<Estate,UpdateEstateDto >();
            //yeni yaptin 11.08 02.17
            CreateMap<UpdateEstateDto, Estate>();



            CreateMap<Estate, ReadEstateDto>()
                .ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status.Status))
                .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.Type.Name))
                .ForMember(dest => dest.PriceAmount, opt => opt.MapFrom(src => src.Price.Amount))
                 .ForMember(dest => dest.PriceCurrencyCode, opt => opt.MapFrom(src => src.Price.Currency.Code))
                  .ForMember(dest => dest.EstateFirstImage, opt => opt.MapFrom<EstateFirstImageResolver>());



            CreateMap<CreateEstateDto, Estate>();

            CreateMap<UpdateEstateStatusDto, EstateStatus>().ReverseMap();
            CreateMap<EstateStatus, ReadEstateStatusDto>();
            CreateMap<CreateEstateStatusDto, EstateStatus>();
            
            CreateMap<UpdateCurrencyDto, Currency>().ReverseMap();
            CreateMap<Currency, ReadCurrencyDto>();
            CreateMap<CreateCurrencyDto, Currency>();

            //null currencyname code null geliyo bak
            CreateMap<UpdatePriceDto, Price>().ReverseMap();
            CreateMap<Price, ReadPriceDto>()
                .ForMember(dest => dest.CurrencyName, opt => opt.MapFrom(src => src.Currency.CurrencyName)) // 'Currency' nesnesinin 'Name' property'sini DTO'ya atar
                .ForMember(dest => dest.CurrencyCode, opt => opt.MapFrom(src => src.Currency.Code));
            CreateMap<CreatePriceDto, Price>();

            CreateMap<UserForRegistrationDto,User>();


            CreateMap<UpdatePhotoDto, Photo>().ReverseMap();

            CreateMap<Photo, ReadPhotoDto>();

            CreateMap<CreatePhotoDto, Photo>();


        }
    }
}
