namespace Podkrepibg.Campaigns.Infrastructure.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Podkrepibg.Campaigns.Domain.Entities;

    public class BeneficiaryConfiguration : IEntityTypeConfiguration<Beneficiary>
    {
        public void Configure(EntityTypeBuilder<Beneficiary> builder)
        {
            builder
              .HasKey(c => c.Id);

            builder
              .Property(c => c.Id)
              .IsRequired()
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .Property(c => c.Name)
              .HasMaxLength(100)
              .IsRequired();

            builder
              .HasOne(c => c.BeneficiaryType)
              .WithMany()
              .HasForeignKey("BeneficiaryTypeId")
              .IsRequired();

            builder
              .Property(c => c.City)
              .HasMaxLength(50)
              .IsRequired();

            builder
              .Property(c => c.Email)
              .HasMaxLength(100);

            builder
              .Property(c => c.Phone)
              .HasMaxLength(50);

            builder
              .Property(c => c.Website)
              .HasMaxLength(500);
        }
    }
}
