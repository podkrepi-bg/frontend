namespace Podkrepibg.Campaigns.IntegrationTests.CampaignsServiceTests
{
    using System;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Grpc.Core;
    using Moq;
    using NUnit.Framework;
    using Podkrepibg.Campaigns.Domain.Types;

    [TestFixture]
    public class CampaignsTests : CampaignsServiceTestsBase
    {
        [Test]
        public async Task CreateCampaign_WithRandomValidRequest_ShouldPersistCorrectly()
        {
            // Arrange

            var createCampaignTypeRequest = new CreateCampaignTypeRequest
            {
                Name = _faker.Random.Utf16String(1, 50),
                Description = _faker.Random.Utf16String(0, 200)
            };

            var createCampaignTypeResponse = await _campaignsService.CreateCampaignType(
                createCampaignTypeRequest, Mock.Of<ServerCallContext>());

            var createCampaignRequest = new CreateCampaignRequest
            {
                InitiatorId = Guid.NewGuid().ToString(),
                OperatorId = Guid.NewGuid().ToString(),
                BeneficiaryId = Guid.NewGuid().ToString(),
                Title = _faker.Random.Utf16String(1, 200),
                CampaignTypeId = createCampaignTypeResponse.Id
            };

            var expectedCreationDate = DateTime.UtcNow;

            // Act

            var createCampaignResponse = await _campaignsService.CreateCampaign(
                createCampaignRequest, Mock.Of<ServerCallContext>());

            // Assert

            createCampaignTypeResponse.Should().NotBeNull();

            var campaignFromDb = await _appDbContext.Campaigns.FindAsync(Guid.Parse(createCampaignResponse.Id));
            campaignFromDb.Title.Should().BeSameAs(createCampaignRequest.Title);
            campaignFromDb.InitiatorId.Should().Be(createCampaignRequest.InitiatorId);
            campaignFromDb.OperatorId.Should().Be(createCampaignRequest.OperatorId);
            campaignFromDb.BeneficiaryId.Should().Be(createCampaignRequest.BeneficiaryId);
            campaignFromDb.State.Should().Be(CampaignState.Draft);
            campaignFromDb.CampaignType.Should().NotBeNull();
            campaignFromDb.CampaignType.Name.Should().BeSameAs(createCampaignTypeRequest.Name);
            campaignFromDb.CreationDate.Should().BeCloseTo(expectedCreationDate, 200);
        }
    }
}
