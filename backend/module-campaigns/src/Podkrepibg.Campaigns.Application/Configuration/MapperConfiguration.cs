namespace Podkrepibg.Campaigns.Application.Configuration
{
    using DataContracts.Campaign;
    using Mapster;

    public static class MapperConfiguration
    {
        public static void ConfigureMapper()
        {
            TypeAdapterConfig<Domain.Entities.Campaign, CampaignDetails>
                .NewConfig()
                .IgnoreNullValues(true);
        }
    }
}
