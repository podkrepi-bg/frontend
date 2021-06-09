namespace Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary
{
    using FluentValidation;

    public class CreateBeneficiaryValidator : AbstractValidator<CreateBeneficiaryCommand>
    {
        public CreateBeneficiaryValidator()
        {
            RuleFor(c => c.Request.FirstName)
                .NotEmpty();

            RuleFor(c => c.Request.LastName)
                .NotEmpty();

            RuleFor(c => c.Request.Type)
                .IsInEnum()
                .WithMessage("not a valid beneficiary type provided");

            RuleFor(c => c.Request.CountryIsoCode)
                .NotEmpty();

            RuleFor(c => c.Request.City)
                .NotEmpty();
        }
    }
}
