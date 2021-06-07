namespace Podkrepibg.Campaigns.IntegrationTests.CampaignsServiceTests
{
    using System;
    using System.Threading.Tasks;
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
                Name = _faker.Name.FullName(),
                Type = Nomenclatures.BeneficiaryType.Individual,
                CountryIsoCode = Nomenclatures.ISO2CountryCode.Bg,
                City = _faker.Address.City(),
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
            beneficiaryFromDb.Name.Should().Be(createBeneficiaryRequest.Name);
            beneficiaryFromDb.Type.Should().Be(createBeneficiaryRequest.Type);
            beneficiaryFromDb.ISO2CountryCode.Should().Be(createBeneficiaryRequest.CountryIsoCode);
            beneficiaryFromDb.City.Should().Be(createBeneficiaryRequest.City);
        }
    }
}
