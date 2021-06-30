namespace Podkrepibg.Campaigns.IntegrationTests.CampaignsServiceTests
{
    using System;
    using System.Threading.Tasks;
    using DataContracts.Campaign;
    using DataContracts.Common.Nomenclatures;
    using FluentAssertions;
    using Grpc.Core;
    using Moq;
    using NUnit.Framework;

    public class BeneficiaryTests : CampaignsServiceTestsBase
    {
        [Test]
        public async Task CreateBeneficiary_WithRandomValidRequest_ShouldPersistCorrectly()
        {
            // Arrange

            var createBeneficiaryRequest = new CreateBeneficiaryRequest
            {
                FirstName = _faker.Name.FirstName(),
                LastName = _faker.Name.LastName(),
                Type = BeneficiaryType.Individual,
                OrganizerId = Guid.NewGuid().ToString(),
                CountryIsoCode = CountryCode.Bg,
                City = City.Varna,
                Email = _faker.Internet.Email(),
                Phone = _faker.Phone.PhoneNumber(),
                Website = _faker.Internet.Url()
            };

            // Act

            var createBeneficiaryResponse = await _campaignsService.CreateBeneficiary(
                createBeneficiaryRequest, Mock.Of<ServerCallContext>());

            // Assert

            createBeneficiaryResponse.Should().NotBeNull();

            var beneficiaryFromDb = await _appDbContext.Beneficiaries.FindAsync(Guid.Parse(createBeneficiaryResponse.Id));
            beneficiaryFromDb.FirstName.Should().Be(createBeneficiaryRequest.FirstName);
            beneficiaryFromDb.LastName.Should().Be(createBeneficiaryRequest.LastName);
            beneficiaryFromDb.Type.Should().Be(createBeneficiaryRequest.Type);
            beneficiaryFromDb.OrganizerId.ToString().Should().Be(createBeneficiaryRequest.OrganizerId);
            beneficiaryFromDb.ISO2CountryCode.Should().Be(createBeneficiaryRequest.CountryIsoCode);
            beneficiaryFromDb.City.Should().Be(createBeneficiaryRequest.City);
        }
    }
}
