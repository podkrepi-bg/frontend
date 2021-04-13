using System;
using System.Collections.Generic;

namespace Podkrepibg.Campaigns.Domain.Entities
{
  public class CampaignType
  {
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string DescriptionKey { get; set; }

    public virtual ICollection<CampaignSubType> CampaignSubTypes { get; set; }
  }
}
