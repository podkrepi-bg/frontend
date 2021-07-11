namespace Podkrepibg.Campaigns.Infrastructure.Configuration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Podkrepibg.Campaigns.Application.Data;
    using Podkrepibg.Campaigns.Infrastructure.Persistence;

    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<CampaignsContext>());
            services.AddScoped<IApplicationReadOnlyDbContext>(provider => provider.GetService<CampaignsContext>());

            services.AddDbContext<CampaignsContext>(
                options => options.UseNpgsql(DbConfiguration.GetConnectionString()));

            return services;
        }
    }
}
