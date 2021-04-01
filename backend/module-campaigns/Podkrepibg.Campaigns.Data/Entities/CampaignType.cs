using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Podkrepibg.Campaigns.Data.Entities
{
  public class CampaignType
  {
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    [MaxLength(50)]
    public string DescriptionKey { get; set; }

    public virtual ICollection<CampaignSubType> CampaignSubTypes { get; set; }

    public virtual ICollection<Campaign> Campaigns { get; set; }
  }
}
