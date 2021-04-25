namespace Podkrepibg.Campaigns.Domain.Entities
{
    using System;
    using System.Collections.Generic;

    public class CampaignType
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<CampaignSubType> CampaignSubTypes { get; set; }
    }
}
