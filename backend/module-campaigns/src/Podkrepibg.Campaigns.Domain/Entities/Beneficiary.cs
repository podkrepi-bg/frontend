namespace Podkrepibg.Campaigns.Domain.Entities
{
    using System;
    using System.Collections.Generic;
    using Podkrepibg.Campaigns.Domain.Types;

    public class Beneficiary
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public BeneficiaryType Type { get; set; }

        public Guid OrganizerId { get; set; }

        public ISO2CountryCode ISO2CountryCode { get; set; }

        public string City { get; set; }
        
        public string Email { get; set; }

        public string Phone { get; set; }

        public BeneficiaryAdditionalDetails AdditionalDetails { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
