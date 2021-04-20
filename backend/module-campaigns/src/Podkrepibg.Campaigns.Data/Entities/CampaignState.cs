namespace Podkrepibg.Campaigns.Data.Entities
{
  public enum CampaignState
  {
    UndefinedCampaign = 0,

    Draft = 1,

    PendingValidation = 2,

    Approved = 3,

    Rejected = 4,

    Active = 5,

    ActivePendingValidation = 6,

    Suspended = 7,

    Complete = 8,

    Disabled = 9,

    Error = 10
  }
}
