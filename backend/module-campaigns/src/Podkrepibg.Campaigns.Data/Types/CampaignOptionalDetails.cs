using Newtonsoft.Json;

namespace Podkrepibg.Campaigns.Data.Types
{
  public readonly struct CampaignOptionalDetails
  {
    [JsonConstructor]
    public CampaignOptionalDetails(string videoUrl)
    {
      VideoUrl = videoUrl;
    }

    public string VideoUrl { get; }
  }
}
