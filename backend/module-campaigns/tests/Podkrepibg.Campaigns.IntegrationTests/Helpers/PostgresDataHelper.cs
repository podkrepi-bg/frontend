using System.Threading.Tasks;
using Npgsql;

namespace Podkrepibg.Campaigns.IntegrationTests.Helpers
{
    public class PostgresDataHelper
    {
        private readonly string _connectionString;

        public PostgresDataHelper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task DeleteAllCampaignTypes()
        {
            using var conn = new NpgsqlConnection(_connectionString);
            conn.Open();

            using var command = conn.CreateCommand();
            command.CommandText = "DELETE FROM campaign.campaign_types";

            await command.ExecuteNonQueryAsync();
        }

        public async Task DeleteAllCampaigns()
        {
            using var conn = new NpgsqlConnection(_connectionString);
            conn.Open();

            using var command = conn.CreateCommand();
            command.CommandText = "DELETE FROM campaign.campaigns";

            await command.ExecuteNonQueryAsync();
        }
    }
}
