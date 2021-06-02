namespace Podkrepibg.Campaigns.Application.Data
{
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Podkrepibg.Campaigns.Domain.Entities;

    public interface IApplicationDbContext
    {
        public DbSet<CampaignType> CampaignTypes { get; }

        public DbSet<CampaignSubtype> CampaignSubtypes { get; }

        public DbSet<Campaign> Campaigns { get; }

        public DbSet<BeneficiaryType> BeneficiaryTypes { get; set; }

        public DbSet<Beneficiary> Beneficiaries { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
