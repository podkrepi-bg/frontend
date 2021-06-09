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
              .Property(c => c.FirstName)
              .HasMaxLength(100)
              .IsRequired();

            builder
              .Property(c => c.LastName)
              .HasMaxLength(100)
              .IsRequired();

            builder
              .Property(c => c.Type)
              .HasConversion<int>()
              .IsRequired();

            builder
              .Property(c => c.ISO2CountryCode)
              .HasConversion<int>()
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
