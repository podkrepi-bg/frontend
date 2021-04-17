using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Podkrepibg.Campaigns.Domain.Entities;

namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    public class CampaignSubTypeConfiguration : IEntityTypeConfiguration<CampaignSubType>
    {
        public void Configure(EntityTypeBuilder<CampaignSubType> builder)
        {
            builder
              .HasKey(c => c.Id);

            builder
              .Property(x => x.Id)
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .HasOne<CampaignType>()
              .WithMany()
              .HasForeignKey("CampaignTypeId");

            builder
              .Property(c => c.CampaignTypeId)
              .IsRequired();

            builder
              .Property(c => c.Name)
              .IsRequired()
              .HasMaxLength(50);

            builder
              .Property(c => c.DescriptionKey)
              .HasMaxLength(200);
        }
    }
}
