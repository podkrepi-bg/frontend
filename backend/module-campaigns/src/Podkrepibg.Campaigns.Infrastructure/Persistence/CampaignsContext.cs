namespace Podkrepibg.Campaigns.Infrastructure.Persistence
{
    using System.Diagnostics;
    using System.Linq;
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;
    using Podkrepibg.Campaigns.Application.Data;
    using Podkrepibg.Campaigns.Domain.Entities;

    public class CampaignsContext : DbContext, IApplicationDbContext, IApplicationReadOnlyDbContext
    {
        public DbSet<CampaignType> CampaignTypes { get; set; }

        public DbSet<CampaignSubtype> CampaignSubtypes { get; set; }

        public DbSet<Campaign> Campaigns { get; set; }

        public CampaignsContext(DbContextOptions<CampaignsContext> options) : base(options)
        {
        }

        public IQueryable<CampaignType> GetCampaignTypes() => CampaignTypes.AsNoTracking();

        public IQueryable<CampaignSubtype> GetCampaignSubtypes() => CampaignSubtypes.AsNoTracking();

        public IQueryable<Campaign> GetCampaigns() => Campaigns.AsNoTracking();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSnakeCaseNamingConvention()
                .LogTo(message => Debug.WriteLine(message)).EnableSensitiveDataLogging().EnableDetailedErrors();

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("campaign");

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
    }
}
