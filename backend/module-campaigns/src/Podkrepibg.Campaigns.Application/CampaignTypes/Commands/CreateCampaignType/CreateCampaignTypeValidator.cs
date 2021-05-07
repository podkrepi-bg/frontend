namespace Podkrepibg.Campaigns.Application.CampaignTypes.Commands.CreateCampaignType
{
    using FluentValidation;

    public class CreateCampaignTypeValidator : AbstractValidator<CreateCampaignTypeRequest>
    {
        public CreateCampaignTypeValidator()
        {
            RuleFor(r => r.Name).NotEmpty();
        }
    }
}
