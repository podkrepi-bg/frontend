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
                Name = _faker.Random.Utf16String(1, 50, true),
                Description = _faker.Random.Utf16String(0, 200, true)
            };

            var createCampaignTypeResponse = await _campaignsService.CreateCampaignType(
                createCampaignTypeRequest, Mock.Of<ServerCallContext>());

            var createCampaignRequest = new CreateCampaignRequest
            {
                InitiatorId = Guid.NewGuid().ToString(),
                OperatorId = Guid.NewGuid().ToString(),
                BeneficiaryId = Guid.NewGuid().ToString(),
                Title = _faker.Random.Utf16String(1, 200, true),
                CampaignTypeId = createCampaignTypeResponse.Id
            };

            var expectedCreationDate = DateTime.UtcNow;

            // Act

            var createCampaignResponse = await _campaignsService.CreateCampaign(
                createCampaignRequest, Mock.Of<ServerCallContext>());

            // Assert

            createCampaignTypeResponse.Should().NotBeNull();

            var campaignFromDb = await _appDbContext.Campaigns.FindAsync(Guid.Parse(createCampaignResponse.Id));
            campaignFromDb.Title.Should().Be(createCampaignRequest.Title);
            campaignFromDb.InitiatorId.Should().Be(createCampaignRequest.InitiatorId);
            campaignFromDb.OperatorId.Should().Be(createCampaignRequest.OperatorId);
            campaignFromDb.BeneficiaryId.Should().Be(createCampaignRequest.BeneficiaryId);
            campaignFromDb.State.Should().Be(CampaignState.Draft);
            campaignFromDb.CampaignType.Should().NotBeNull();
            campaignFromDb.CampaignType.Name.Should().Be(createCampaignTypeRequest.Name);
            campaignFromDb.CreationDate.Should().BeCloseTo(expectedCreationDate, 200);
        }

        [Test]
        public async Task GetCampaignDetailsAfterCreateCampaign_WithRandomValidRequest_ShouldReturnCorrectCampaignDetails()
        {
            // Arrange

            var createCampaignTypeRequest = new CreateCampaignTypeRequest
            {
                Name = _faker.Random.Utf16String(1, 50, true),
                Description = _faker.Random.Utf16String(0, 200, true)
            };

            var createCampaignTypeResponse = await _campaignsService.CreateCampaignType(
                createCampaignTypeRequest, Mock.Of<ServerCallContext>());

            var createCampaignRequest = new CreateCampaignRequest
            {
                InitiatorId = Guid.NewGuid().ToString(),
                OperatorId = Guid.NewGuid().ToString(),
                BeneficiaryId = Guid.NewGuid().ToString(),
                Title = _faker.Random.Utf16String(1, 200, true),
                CampaignTypeId = createCampaignTypeResponse.Id
            };

            // Act

            var createCampaignResponse = await _campaignsService.CreateCampaign(
                createCampaignRequest, Mock.Of<ServerCallContext>());

            var campaignDetails = await _campaignsService.GetCampaignDetails(
                new GetCampaignDetailsRequest { Id = createCampaignResponse.Id }, Mock.Of<ServerCallContext>());

            // Assert

            campaignDetails.Should().NotBeNull();

            campaignDetails.Title.Should().Be(createCampaignRequest.Title);
            campaignDetails.InitiatorId.Should().Be(createCampaignRequest.InitiatorId);
            campaignDetails.OperatorId.Should().Be(createCampaignRequest.OperatorId);
            campaignDetails.BeneficiaryId.Should().Be(createCampaignRequest.BeneficiaryId);
            campaignDetails.State.Should().Be(CampaignState.Draft);
            campaignDetails.CampaignType.Should().NotBeNull();
            campaignDetails.CampaignType.Name.Should().Be(createCampaignTypeRequest.Name);
            campaignDetails.CampaignSubTypes.Should().BeNull();
            campaignDetails.ShortDescription.Should().BeEmpty();
            campaignDetails.FullDescription.Should().BeEmpty();
        }
    }
}
