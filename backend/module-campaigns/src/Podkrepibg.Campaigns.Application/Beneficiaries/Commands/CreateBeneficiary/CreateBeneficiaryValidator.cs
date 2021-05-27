namespace Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary
{
    using System;
    using FluentValidation;

    public class CreateBeneficiaryValidator : AbstractValidator<CreateBeneficiaryCommand>
    {
        public CreateBeneficiaryValidator()
        {
            RuleFor(c => c.Request.Name)
                .NotEmpty();

            RuleFor(c => c.Request.BeneficiaryTypeId)
                .Must(id => Guid.TryParse(id, out var _))
                .WithMessage("not a valid guid provided");

            RuleFor(c => c.Request.CountryIsoCode)
                .NotEmpty();

            RuleFor(c => c.Request.City)
                .NotEmpty();
        }
    }
}
