namespace Podkrepibg.Campaigns.Application.Configuration
{
    using FluentValidation;
    using System.Reflection;
    using MediatR;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Podkrepibg.Campaigns.Application.Behaviors;

    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddMediatR(Assembly.GetExecutingAssembly())
                .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly())
                .AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            MapperConfiguration.ConfigureMapper();

            return services;
        }
    }
}
