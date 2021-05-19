namespace Podkrepibg.Campaigns.Application.CampaignTypes.Commands.CreateCampaignType
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Podkrepibg.Campaigns.Application.Data;

    using CampaignTypeEntity = Domain.Entities.CampaignType;

    public record CreateCampaignTypeCommand(CreateCampaignTypeRequest Request) : IRequest<CreateCampaignTypeResponse>;

    public class CreateCampaignTypeCommandHandler : IRequestHandler<CreateCampaignTypeCommand, CreateCampaignTypeResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateCampaignTypeCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CreateCampaignTypeResponse> Handle(CreateCampaignTypeCommand request, CancellationToken cancellationToken)
        {
            var campaignType = new CampaignTypeEntity
            {
                Name = request.Request.Name,
                Description = request.Request.Description
            };

            var trackedEntity = _dbContext.CampaignTypes.Add(campaignType);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new CreateCampaignTypeResponse
            {
                Id = trackedEntity.Entity.Id.ToString()
            };
        }
    }
}
