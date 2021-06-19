namespace Podkrepibg.Campaigns.Application.Campaigns.Commands.CreateCampaign
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Podkrepibg.Campaigns;
    using Podkrepibg.Campaigns.Application.Data;
    using Podkrepibg.Campaigns.Domain.Types;
    using CampaignEntity = Domain.Entities.Campaign;

    public record CreateCampaignCommand(CreateCampaignRequest Request) : IRequest<CreateCampaignResponse>;

    public class CreateCampaignCommandHandler : IRequestHandler<CreateCampaignCommand, CreateCampaignResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateCampaignCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CreateCampaignResponse> Handle(CreateCampaignCommand request, CancellationToken cancellationToken)
        {
            var campaign = new CampaignEntity
            {
                InitiatorId = Guid.Parse(request.Request.InitiatorId),
                OperatorId = Guid.Parse(request.Request.OperatorId),
                BeneficiaryId = Guid.Parse(request.Request.BeneficiaryId),
                CampaignTypeId = Guid.Parse(request.Request.CampaignTypeId),
                Title = request.Request.Title,
                State = CampaignState.Draft,
                CreationDate = DateTime.UtcNow
            };

            var trackedEntity = _dbContext.Campaigns.Add(campaign);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new CreateCampaignResponse
            {
                Id = trackedEntity.Entity.Id.ToString()
            };
        }
    }
}
