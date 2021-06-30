namespace Podkrepibg.Campaigns.Services
{
    using System.Threading.Tasks;
    using Google.Protobuf.WellKnownTypes;
    using Grpc.Core;
    using MediatR;
    using Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary;
    using Podkrepibg.Campaigns.Application.Campaigns.Commands.CreateCampaign;
    using Podkrepibg.Campaigns.Application.Campaigns.Queries.GetCampaigns;
    using Podkrepibg.Campaigns.Application.CampaignTypes.Commands.CreateCampaignType;
    using Podkrepibg.DataContracts.Campaign;

    public class CampaignsService : CampaignService.CampaignServiceBase
    {
        private readonly ISender _mediator;

        public CampaignsService(ISender mediator)
        {
            _mediator = mediator;
        }

        public override Task<CreateCampaignResponse> CreateCampaign(CreateCampaignRequest request, ServerCallContext context)
        {
            return _mediator.Send(new CreateCampaignCommand(request));
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
            return _mediator.Send(new GetCampaignDetailsQuery(request.Id));
        }

        public override Task<CreateCampaignTypeResponse> CreateCampaignType(CreateCampaignTypeRequest request, ServerCallContext context)
        {
            return _mediator.Send(new CreateCampaignTypeCommand(request));
        }

        public override Task<CampaignTypesResponse> ListCampaignTypes(Empty request, ServerCallContext context)
        {
            return base.ListCampaignTypes(request, context);
        }

        public override Task<CreateBeneficiaryResponse> CreateBeneficiary(CreateBeneficiaryRequest request, ServerCallContext context)
        {
            return _mediator.Send(new CreateBeneficiaryCommand(request));
        }
    }
}
