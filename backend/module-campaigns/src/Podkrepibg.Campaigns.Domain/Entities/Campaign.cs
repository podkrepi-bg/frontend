namespace Podkrepibg.Campaigns.Domain.Entities
{
    using System;
    using Podkrepibg.Campaigns.Domain.Types;

    public class Campaign
    {
        public Guid Id { get; set; }

        public CampaignState State { get; set; }

        public Guid InitiatorId { get; set; }

        public Guid OperatorId { get; set; }

        public Guid BeneficiaryId { get; set; }

        public Guid CampaignTypeId { get; set; }

        public Guid? CampaignSubtypeId { get; set; }

        public string Title{ get; set; }

        public string ShortDescription { get; set; }

        public string FullDescription { get; set; }

        public decimal TargetAmount { get; set; }

        public CurrencyCode Currency { get; set; }

        public DateTime? Deadline { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public CampaignOptionalDetails OptionalDetails { get; set; }

        public Beneficiary Beneficiary { get; set; }

        public CampaignType CampaignType { get; set; }

        public CampaignSubtype CampaignSubtype { get; set; }
    }
}
