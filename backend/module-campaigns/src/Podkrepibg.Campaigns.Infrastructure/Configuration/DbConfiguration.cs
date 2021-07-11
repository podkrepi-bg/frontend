namespace Podkrepibg.Campaigns.Infrastructure.Configuration
{
    using System;

    public class DbConfiguration
    {
        private static string DbHost = Environment.GetEnvironmentVariable("DB_HOST");
        private static string DbPort = Environment.GetEnvironmentVariable("DB_PORT");

        public static string GetConnectionString()
        {
            return $"Host={DbHost};Port={DbPort};Database=app;Username=root;Password=1234";
        }
    }
}