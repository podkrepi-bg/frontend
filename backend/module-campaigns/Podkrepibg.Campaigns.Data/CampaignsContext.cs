using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Podkrepibg.Campaigns.Data.Entities;
using Podkrepibg.Campaigns.Data.Types;

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
        optionsBuilder.UseNpgsql("Host=Diana-PC;Port=26257;Database=campaigns;Username=root;Password=1234");
      }

      base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Campaign>()
          .Property(x => x.Id)
          .HasDefaultValueSql("gen_random_uuid()");

      modelBuilder.Entity<Campaign>()
          .Property(b => b.OptionalDetails)
          .HasConversion(
              v => JsonConvert.SerializeObject(v),
              v => JsonConvert.DeserializeObject<CampaignOptionalDetails>(v));

      modelBuilder.Entity<CampaignType>()
          .Property(x => x.Id)
          .HasDefaultValueSql("gen_random_uuid()");

      modelBuilder.Entity<CampaignSubType>()
          .Property(x => x.Id)
          .HasDefaultValueSql("gen_random_uuid()");
    }
  }
}
