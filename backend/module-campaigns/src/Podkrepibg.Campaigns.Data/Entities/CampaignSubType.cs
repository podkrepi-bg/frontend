using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Podkrepibg.Campaigns.Data.Entities
{
  public class CampaignSubType
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

    [Required]
    public Guid CampaignTypeId { get; set; }

    [ForeignKey("CampaignTypeId")]
    public CampaignType CampaignType { get; set; }

    public virtual ICollection<Campaign> Campaigns { get; set; }
  }
}
