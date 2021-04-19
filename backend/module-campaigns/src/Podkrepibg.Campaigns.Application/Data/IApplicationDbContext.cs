namespace Podkrepibg.Campaigns.Application.Data
{
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Podkrepibg.Campaigns.Domain.Entities;

    public interface IApplicationDbContext
    {
        public DbSet<CampaignType> CampaignTypes { get; set; }

        public DbSet<CampaignSubType> CampaignSubTypes { get; set; }

        public DbSet<Campaign> Campaigns { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
