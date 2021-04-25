namespace Podkrepibg.Campaigns.Application.Data
{
    using System.Linq;
    using Podkrepibg.Campaigns.Domain.Entities;

    public interface IApplicationReadOnlyDbContext
    {
        public IQueryable<CampaignType> GetCampaignTypes();

        public IQueryable<CampaignSubType> GetCampaignSubTypes();

        public IQueryable<Campaign> GetCampaigns();
    }
}
