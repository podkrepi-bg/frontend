namespace Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary
{
    using System;
    using FluentValidation;

    public class CreateBeneficiaryValidator : AbstractValidator<CreateBeneficiaryCommand>
    {
        public CreateBeneficiaryValidator()
        {
            RuleFor(b => b.Request.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(b => b.Request.LastName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(b => b.Request.Type)
                .IsInEnum()
                .WithMessage("not a valid beneficiary type provided");

            RuleFor(b => b.Request.OrganizerId)
                .Must(id => Guid.TryParse(id, out var _))
                .WithMessage("not a valid guid provided");

            RuleFor(b => b.Request.CountryIsoCode)
                .IsInEnum()
                .WithMessage("not a valid countryIso2Code provided");

            RuleFor(b => b.Request.City)
                .IsInEnum()
                .WithMessage("not a valid city provided");

            RuleFor(b => b.Request.Email)
                .EmailAddress()
                .MaximumLength(100);
        }
    }
}
