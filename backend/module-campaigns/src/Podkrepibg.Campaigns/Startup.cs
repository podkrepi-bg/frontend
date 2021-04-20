using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Podkrepibg.Campaigns.Data;

namespace Podkrepibg.Campaigns
{
  public class Startup
  {
    private IConfigurationRoot Configuration { get; set; }

    public Startup(IWebHostEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json")
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json")
          .AddEnvironmentVariables();

      Configuration = builder.Build();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddGrpc();
      services.AddOptions();
      services.AddSingleton<IConfigurationRoot>(Configuration);
      services.AddDbContext<CampaignsContext>(options =>
          options.UseNpgsql(Configuration.GetConnectionString("CampaignDb")));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGrpcService<Services.CampaignsService>();

        endpoints.MapGet("/", async context =>
        {
          await context.Response.WriteAsync("Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
        });
      });
    }
  }
}
