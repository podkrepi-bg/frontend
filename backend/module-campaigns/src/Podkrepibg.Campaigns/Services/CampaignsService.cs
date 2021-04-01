using System;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Podkrepibg.Campaigns.Data;
using Podkrepibg.Nomenclatures;

namespace Podkrepibg.Campaigns.Services
{
  public class CampaignsService : CampaignService.CampaignServiceBase
  {
    private readonly ILogger<CampaignsService> _logger;
    private readonly CampaignsContext _db;

    public CampaignsService(ILogger<CampaignsService> logger, CampaignsContext db)
    {
      _logger = logger;
      _db = db;
    }

    public override Task<CreateCampaignResponse> CreateCampaign(CreateCampaignRequest request, ServerCallContext context)
    {
      return Task.FromResult(
        new CreateCampaignResponse
        {
          BeneficiaryId = request.BeneficiaryId,
          CampaignId = Guid.NewGuid().ToString(),
          InitiatorId = request.InitiatorId,
          OperatorId = request.OperatorId,
          State = CampaignState.Draft
        });
    }

    public override Task<CampaignTypesReply> CampaignTypes(Empty request, ServerCallContext context)
    {
      return base.CampaignTypes(request, context);
    }

    public override Task<FilterCampaignsReply> FilterCampaigns(FilterCampaignsRequest request, ServerCallContext context)
    {
      return base.FilterCampaigns(request, context);
    }

    public override Task<ListCampaignsResponse> ListCampaigns(ListCampaignsRequest request, ServerCallContext context)
    {
      return base.ListCampaigns(request, context);
    }
  }
}
