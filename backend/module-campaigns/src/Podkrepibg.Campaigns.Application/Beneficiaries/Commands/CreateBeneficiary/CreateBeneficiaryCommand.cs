namespace Podkrepibg.Campaigns.Application.Beneficiaries.Commands.CreateBeneficiary
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Podkrepibg.Campaigns.Application.Data;
    using Podkrepibg.Campaigns.Domain.Types;
    using BeneficiaryEntity = Domain.Entities.Beneficiary;

    public record CreateBeneficiaryCommand(CreateBeneficiaryRequest Request) : IRequest<CreateBeneficiaryResponse>;

    public class CreateBeneficiaryCommandHandler : IRequestHandler<CreateBeneficiaryCommand, CreateBeneficiaryResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateBeneficiaryCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CreateBeneficiaryResponse> Handle(CreateBeneficiaryCommand request, CancellationToken cancellationToken)
        {
            var beneficiaryRequest = request.Request;
            var beneficiary = new BeneficiaryEntity
            {
                FirstName = beneficiaryRequest.FirstName,
                LastName = beneficiaryRequest.LastName,
                Type = (BeneficiaryType)beneficiaryRequest.Type,
                OrganizerId = Guid.Parse(beneficiaryRequest.OrganizerId),
                ISO2CountryCode = (ISO2CountryCode)beneficiaryRequest.CountryIsoCode,
                City = beneficiaryRequest.City,
                Email = beneficiaryRequest.Email,
                Phone = beneficiaryRequest.Phone,
                Website = beneficiaryRequest.Website
            };

            var trackedEntity = _dbContext.Beneficiaries.Add(beneficiary);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new CreateBeneficiaryResponse
            {
                Id = trackedEntity.Entity.Id.ToString()
            };
        }
    }
}
