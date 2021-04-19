namespace Podkrepibg.Campaigns.Application.Queries.GetCampaigns
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Podkrepibg.Campaigns.Application.Data;

    public class GetCampaignDetailsQuery : IRequest<CampaignDetails>
    {
        public string Id { get; set; }
    }

    public class GetCampaignDetailsQueryHandler : IRequestHandler<GetCampaignDetailsQuery, CampaignDetails>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetCampaignDetailsQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<CampaignDetails> Handle(GetCampaignDetailsQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
