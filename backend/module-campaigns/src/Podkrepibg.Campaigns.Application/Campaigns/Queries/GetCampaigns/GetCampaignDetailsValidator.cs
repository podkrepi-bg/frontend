namespace Podkrepibg.Campaigns.Application.Campaigns.Queries.GetCampaigns
{
    using System;
    using FluentValidation;

    public class GetCampaignDetailsValidator : AbstractValidator<GetCampaignDetailsQuery>
    {
        public GetCampaignDetailsValidator()
        {
            RuleFor(q => q.Id)
                .Must(id => Guid.TryParse(id, out var _))
                .WithMessage("not a valid guid provided");
        }
    }
}
