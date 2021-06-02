namespace Podkrepibg.Beneficiarys.Infrastructure.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Podkrepibg.Campaigns.Domain.Entities;

    class BeneficiaryTypeConfiguration : IEntityTypeConfiguration<BeneficiaryType>
    {
        public void Configure(EntityTypeBuilder<BeneficiaryType> builder)
        {
            builder
              .HasKey(c => c.Id);

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
