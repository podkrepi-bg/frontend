using Microsoft.EntityFrameworkCore;
using Podkrepibg.Campaigns.Domain.Entities;
using System.Reflection;

namespace Podkrepibg.Campaigns.Data
{
    public class CampaignsContext : DbContext
    {
        public DbSet<CampaignType> CampaignTypes { get; set; }
        public DbSet<CampaignSubType> CampaignSubTypes { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }

        public CampaignsContext(DbContextOptions<CampaignsContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=26257;Database=campaigns;Username=root;Password=1234");
            }

            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
    }
}
