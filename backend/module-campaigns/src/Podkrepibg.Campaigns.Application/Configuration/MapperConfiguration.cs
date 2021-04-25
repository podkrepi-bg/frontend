namespace Podkrepibg.Campaigns.Application.Configuration
{
    using Mapster;

    public static class MapperConfiguration
    {
        public static void ConfigureMapper()
        {
            TypeAdapterConfig<Domain.Entities.Campaign, CampaignDetails>
                .NewConfig();
        }
    }
}
