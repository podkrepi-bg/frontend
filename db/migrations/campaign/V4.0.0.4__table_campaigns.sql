BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS campaign.beneficiary_type (
    id uuid NOT NULL DEFAULT (gen_random_uuid()),
    name character varying(50) NOT NULL,
    description character varying(50) NULL,
	
    CONSTRAINT "PK_BeneficiaryType" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS campaign.beneficiaries (
    id uuid NOT NULL DEFAULT (gen_random_uuid()),
    name character varying(100) NOT NULL,
    beneficiary_type_id uuid NOT NULL,
    iso2country_code integer NOT NULL,
    city character varying(50) NOT NULL,
    email character varying(100) NULL,
    phone character varying(50) NULL,
    website character varying(500) NULL,
	
    CONSTRAINT "PK_Beneficiaries" PRIMARY KEY (id),
    CONSTRAINT "FK_Beneficiaries_BeneficiaryType_BeneficiaryTypeId" FOREIGN KEY (beneficiary_type_id) REFERENCES campaign.beneficiary_type (id) ON DELETE CASCADE
);

ALTER TABLE campaign.campaigns (
    CONSTRAINT "FK_Campaigns_Beneficiaries_BeneficiaryId" FOREIGN KEY (beneficiary_id) REFERENCES campaign.beneficiaries (id) ON DELETE CASCADE
);

CREATE INDEX "IX_Beneficiaries_BeneficiaryTypeId" ON campaign.beneficiaries (beneficiary_type_id);

CREATE INDEX "IX_Campaigns_BeneficiaryId" ON campaign.campaigns (beneficiary_id);

COMMIT;