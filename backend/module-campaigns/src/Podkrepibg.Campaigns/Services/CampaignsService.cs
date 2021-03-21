using Grpc.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Podkrepibg.Campaigns
{
    public class CampaignsService : Campaigns.CampaignsBase
    {
        private readonly ILogger<CampaignsService> _logger;
        public CampaignsService(ILogger<CampaignsService> logger)
        {
            _logger = logger;
        }

        public override Task<CreateCampaignResponse> Create(CreateCampaignRequest request, ServerCallContext context)
        {
            return Task.FromResult(
              new CreateCampaignResponse
              {
                  CampaignId = Guid.NewGuid().ToString(),
                  ErrorCode = 0
              });
        }
    }
}
