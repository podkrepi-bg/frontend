namespace Podkrepibg.Campaigns.Application.Data
{
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Podkrepibg.Campaigns.Domain.Entities;

    public interface IApplicationDbContext
    {
        public DbSet<CampaignType> CampaignTypes { get; }

        public DbSet<CampaignSubType> CampaignSubTypes { get; }

        public DbSet<Campaign> Campaigns { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
