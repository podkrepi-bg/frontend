namespace Podkrepibg.Campaigns.IntegrationTests.CampaignsServiceTests
{
    using System;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Grpc.Core;
    using Moq;
    using NUnit.Framework;

    [TestFixture]
    public class CampaignTypesTests : CampaignsServiceTestsBase
    {
        [Test]
        public async Task CreateCampaignType_WithRandomValidRequest_ShouldPersistCorrectly()
        {
            // Arrange

            var createCampaignTypeRequest = new CreateCampaignTypeRequest
            {
                Name = _faker.Random.Utf16String(1, 50),
                Description = _faker.Random.Utf16String(0, 200)
            };

            // Act

            var createResponse = await _campaignsService.CreateCampaignType(createCampaignTypeRequest, Mock.Of<ServerCallContext>());

            // Assert

            createResponse.Should().NotBeNull();

            var campaignTypeFromDb = await _appDbContext.CampaignTypes.FindAsync(Guid.Parse(createResponse.Id));
            campaignTypeFromDb.Name.Should().BeSameAs(createCampaignTypeRequest.Name);
            campaignTypeFromDb.Description.Should().BeSameAs(createCampaignTypeRequest.Description);
            campaignTypeFromDb.CampaignSubtypes.Should().BeNullOrEmpty();
        }
    }
}