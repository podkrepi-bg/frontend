namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Newtonsoft.Json;
    using Podkrepibg.Campaigns.Domain.Entities;
    using Podkrepibg.Campaigns.Domain.Types;

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
              .HasOne(c => c.CampaignType)
              .WithMany()
              .HasForeignKey("CampaignTypeId")
              .IsRequired();

            builder
              .HasOne(c => c.CampaignSubtype)
              .WithMany()
              .HasForeignKey("CampaignSubtypeId");

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
              .Property(c => c.Title)
              .HasMaxLength(200)
              .IsRequired();

            builder
              .Property(c => c.ShortDescription)
              .HasMaxLength(500);

            builder
                .Property(b => b.OptionalDetails)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<CampaignOptionalDetails>(v));

            builder
                .Property(b => b.CreationDate)
                .HasColumnName("created_at")
                .IsRequired();

            builder
                .Property(b => b.UpdateDate)
                .HasColumnName("updated_at");
        }
    }
}
