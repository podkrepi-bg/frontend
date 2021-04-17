using System;

namespace Podkrepibg.Campaigns.Domain.Entities
{
    public class CampaignSubType
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string DescriptionKey { get; set; }

        public Guid CampaignTypeId { get; set; }

        public CampaignType CampaignType { get; set; }
    }
}
