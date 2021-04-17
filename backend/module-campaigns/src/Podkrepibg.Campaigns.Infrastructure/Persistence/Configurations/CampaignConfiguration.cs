using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Podkrepibg.Campaigns.Domain.Entities;
using Podkrepibg.Campaigns.Domain.Types;

namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
    {
        public void Configure(EntityTypeBuilder<Campaign> builder)
        {
            builder
              .HasKey(c => c.Id);

            builder
              .Property(c => c.Id)
              .IsRequired()
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .HasOne<CampaignType>()
              .WithMany()
              .HasForeignKey("CampaignTypeId");

            builder
              .HasOne<CampaignSubType>()
              .WithMany()
              .HasForeignKey("CampaignSubTypeId");

            builder
              .Property(c => c.State)
              .IsRequired();

            builder
              .Property(c => c.InitiatorId)
              .IsRequired();

            builder
              .Property(c => c.BeneficiaryId)
              .IsRequired();

            builder
              .Property(c => c.OperatorId)
              .IsRequired();

            builder
              .Property(c => c.CampaignTypeId)
              .IsRequired();

            builder
              .Property(c => c.CampaignSubTypeId)
              .IsRequired();

            builder
              .Property(c => c.TitleKey)
              .HasMaxLength(50)
              .IsRequired();

            builder
              .Property(c => c.ShortDescriptionKey)
              .HasMaxLength(500)
              .IsRequired();

            builder
              .Property(c => c.FullDescriptionKey)
              .IsRequired();

            builder
              .Property(c => c.TargetAmount)
              .IsRequired();

            builder
              .Property(c => c.Currency)
              .IsRequired();

            builder
              .Property(c => c.Deadline)
              .IsRequired();

            builder
              .Property(c => c.Verified)
              .IsRequired();

            builder
              .Property(c => c.Recurring)
              .IsRequired();

            builder
                .Property(b => b.OptionalDetails)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<CampaignOptionalDetails>(v));
        }
    }
}
