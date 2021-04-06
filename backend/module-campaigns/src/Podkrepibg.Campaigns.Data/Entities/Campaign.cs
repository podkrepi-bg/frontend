using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Podkrepibg.Campaigns.Data.Types;

namespace Podkrepibg.Campaigns.Data.Entities
{
  public class Campaign
  {
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public CampaignState State { get; set; }

    [Required]
    public Guid InitiatorId { get; set; }

    [Required]
    public Guid BeneficiaryId { get; set; }

    [Required]
    public Guid OperatorId { get; set; }

    [Required]
    public Guid CampaignTypeId { get; set; }

    [Required]
    public Guid CampaignSubTypeId { get; set; }

    [Required]
    [MaxLength(50)]
    public string TitleKey { get; set; }

    [Required]
    [MaxLength(50)]
    public string ShortDescriptionKey { get; set; }

    [MaxLength(50)]
    public string FullDescriptionKey { get; set; }

    [Required]
    public decimal TargetAmount { get; set; }

    [Required]
    public CurrencyCode Currency { get; set; }

    [Required]
    public DateTime CreationDate { get; set; }

    [Required]
    public bool Verified { get; set; }

    public DateTime? Deadline { get; set; }

    [Required]
    public bool Recurring { get; set; }

    public CampaignOptionalDetails OptionalDetails { get; set; }

    [ForeignKey("CampaignTypeId")]
    public CampaignType CampaignType { get; set; }

    [ForeignKey("CampaignSubTypeId")]
    public CampaignSubType CampaignSubType { get; set; }
  }
}
