namespace Podkrepibg.Campaigns.Domain.Types
{
  public readonly struct CampaignOptionalDetails
  {
    public CampaignOptionalDetails(string videoUrl)
    {
      VideoUrl = videoUrl;
    }

    public string VideoUrl { get; }
  }
}
