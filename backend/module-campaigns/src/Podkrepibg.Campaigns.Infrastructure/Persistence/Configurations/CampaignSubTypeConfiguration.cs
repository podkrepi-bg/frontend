namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Podkrepibg.Campaigns.Domain.Entities;

    public class CampaignSubtypeConfiguration : IEntityTypeConfiguration<CampaignSubtype>
    {
        public void Configure(EntityTypeBuilder<CampaignSubtype> builder)
        {
            builder
              .HasKey(c => c.Id);

            builder
              .Property(c => c.Id)
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .Property(c => c.CampaignTypeId)
              .IsRequired();

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
