namespace Podkrepibg.Campaigns.Domain.Types
{
    public class BeneficiaryAdditionalDetails
    {
        public BeneficiaryAdditionalDetails(string website)
        {
            Website = website;
        }

        public string Website { get; }
    }
}
