namespace Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary
{
    using System;
    using FluentValidation;

    public class CreateBeneficiaryValidator : AbstractValidator<CreateBeneficiaryCommand>
    {
        public CreateBeneficiaryValidator()
        {
            RuleFor(b => b.Request.FirstName)
                .NotEmpty();

            RuleFor(b => b.Request.LastName)
                .NotEmpty();

            RuleFor(b => b.Request.Type)
                .IsInEnum()
                .WithMessage("not a valid beneficiary type provided");

            RuleFor(b => b.Request.OrganizerId)
                .Must(id => Guid.TryParse(id, out var _))
                .WithMessage("not a valid guid provided");

            RuleFor(b => b.Request.CountryIsoCode)
                .NotEmpty();

            RuleFor(b => b.Request.City)
                .NotEmpty();
        }
    }
}
