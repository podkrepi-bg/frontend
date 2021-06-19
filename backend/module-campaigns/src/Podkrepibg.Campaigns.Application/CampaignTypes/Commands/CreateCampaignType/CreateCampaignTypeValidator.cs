namespace Podkrepibg.Campaigns.Application.CampaignTypes.Commands.CreateCampaignType
{
    using FluentValidation;

    public class CreateCampaignTypeValidator : AbstractValidator<CreateCampaignTypeRequest>
    {
        public CreateCampaignTypeValidator()
        {
            RuleFor(c => c.Name)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(c => c.Description)
                .MaximumLength(200);
        }
    }
}
