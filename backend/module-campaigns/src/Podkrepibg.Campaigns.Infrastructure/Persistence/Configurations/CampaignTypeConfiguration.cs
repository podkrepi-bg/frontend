namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Podkrepibg.Campaigns.Domain.Entities;

    public class CampaignTypeConfiguration : IEntityTypeConfiguration<CampaignType>
    {
        public void Configure(EntityTypeBuilder<CampaignType> builder)
        {
            builder
              .HasKey(c => c.Id);

            builder
              .HasMany(c => c.CampaignSubtypes)
              .WithOne()
              .HasForeignKey("CampaignTypeId");

            builder
              .Property(c => c.Id)
              .IsRequired()
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .Property(c => c.Name)
              .IsRequired()
              .HasMaxLength(50);

            builder
              .Property(c => c.Description)
              .HasMaxLength(200);
        }
    }
}
