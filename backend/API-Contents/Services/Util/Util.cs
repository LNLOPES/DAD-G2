using AutoMapper;

namespace API_Contents.Services.Util
{
    public static class Util
    {
        public static DestinationType ConverterClasse<SourceType, DestinationType>(this SourceType obj)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<SourceType, DestinationType>();
            });

            var mapper = config.CreateMapper();

            var entity = mapper.Map<DestinationType>(obj);

            return entity;
        }

        public static List<DestinationType> ConverterListaClasse<SourceType, DestinationType>(this List<SourceType> obj)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<SourceType, DestinationType>();
            });

            var mapper = config.CreateMapper();

            var entity = mapper.Map<List<DestinationType>>(obj);

            return entity;
        }
    }
}
