namespace Podkrepibg.Campaigns.Services
{
    using System;
    using System.Threading.Tasks;
    using Google.Protobuf.WellKnownTypes;
    using Grpc.Core;

    public class CampaignsService : CampaignService.CampaignServiceBase
    {
        public CampaignsService()
        {
        }

        public override Task<CreateCampaignResponse> CreateCampaign(CreateCampaignRequest request, ServerCallContext context)
        {
            return Task.FromResult(
              new CreateCampaignResponse()
              {
                  Id = Guid.NewGuid().ToString()
              });
        }

        public override Task<CampaignsResponse> FilterCampaigns(FilterCampaignsRequest request, ServerCallContext context)
        {
            return base.FilterCampaigns(request, context);
        }

        public override Task<CampaignsResponse> ListCampaigns(ListCampaignsRequest request, ServerCallContext context)
        {
            return base.ListCampaigns(request, context);
        }

        public override Task<CampaignDetails> GetCampaignDetails(GetCampaignDetailsRequest request, ServerCallContext context)
        {
            return base.GetCampaignDetails(request, context);
        }

        public override Task<CampaignTypesResponse> ListCampaignTypes(Empty request, ServerCallContext context)
        {
            return base.ListCampaignTypes(request, context);
        }
    }
}
