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
              .HasKey(b => b.Id);

            builder
              .Property(b => b.Id)
              .IsRequired()
              .HasDefaultValueSql("gen_random_uuid()");

            builder
              .Property(b => b.FirstName)
              .HasMaxLength(100)
              .IsRequired();

            builder
              .Property(b => b.LastName)
              .HasMaxLength(100)
              .IsRequired();

            builder
              .Property(b => b.Type)
              .HasConversion<int>()
              .IsRequired();

            builder
                .Property(b => b.OrganizerId)
                .IsRequired();

            builder
              .Property(b => b.ISO2CountryCode)
              .HasConversion<int>()
              .IsRequired();

            builder
              .Property(b => b.City)
              .HasMaxLength(50)
              .IsRequired();

            builder
              .Property(b => b.Email)
              .HasMaxLength(100);

            builder
              .Property(b => b.Phone)
              .HasMaxLength(50);

            builder
              .Property(b => b.Website)
              .HasMaxLength(500);
        }
    }
}
