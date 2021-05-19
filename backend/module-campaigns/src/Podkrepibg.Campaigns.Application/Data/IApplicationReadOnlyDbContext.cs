namespace Podkrepibg.Campaigns.Application.Data
{
    using System.Linq;
    using Podkrepibg.Campaigns.Domain.Entities;

    public interface IApplicationReadOnlyDbContext
    {
        public IQueryable<CampaignType> GetCampaignTypes();

        public IQueryable<CampaignSubtype> GetCampaignSubtypes();

        public IQueryable<Campaign> GetCampaigns();
    }
}
