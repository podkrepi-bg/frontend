namespace Podkrepibg.Campaigns.IntegrationTests.CampaignsServiceTests
{
    using System.IO;
    using System.Threading.Tasks;
    using Bogus;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using NUnit.Framework;
    using Podkrepibg.Campaigns.Application.Configuration;
    using Podkrepibg.Campaigns.Application.Data;
    using Podkrepibg.Campaigns.Infrastructure.Configuration;
    using Podkrepibg.Campaigns.IntegrationTests.Helpers;
    using Podkrepibg.Campaigns.Services;

    public class CampaignsServiceTestsBase
    {
        private IServiceCollection _services;
        private PostgresDataHelper _postgresDataHelper;

        protected ServiceProvider _serviceProvider;
        protected CampaignsService _campaignsService;
        protected IApplicationDbContext _appDbContext;
        protected Faker _faker = new();

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(TestContext.CurrentContext.TestDirectory)
                .AddJsonFile(Path.Combine("Configs", "config.roach.local.json"))
                .Build();

            _services = new ServiceCollection()
                .AddOptions()
                .AddApplication(configuration)
                .AddInfrastructure(configuration)
                .AddScoped<CampaignsService>();

            _postgresDataHelper = new PostgresDataHelper(
                $"Host={configuration.GetSection("DB_HOST").Value};Port={configuration.GetSection("DB_PORT").Value};Database={configuration.GetSection("DB_NAME").Value};Username={configuration.GetSection("DB_USER").Value};Password={configuration.GetSection("DB_PASS").Value}");
        }

        [SetUp]
        public async Task SetUp()
        {
            _serviceProvider = _services.BuildServiceProvider();
            _campaignsService = _serviceProvider.GetRequiredService<CampaignsService>();
            _appDbContext = _serviceProvider.GetRequiredService<IApplicationDbContext>();

            await _postgresDataHelper.DeleteAllCampaigns();
            await _postgresDataHelper.DeleteAllCampaignTypes();
        }

        [TearDown]
        public void TearDown()
        {
        }
    }
}
