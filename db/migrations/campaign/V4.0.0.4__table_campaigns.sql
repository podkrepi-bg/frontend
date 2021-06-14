BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS campaign.beneficiaries (
    id					uuid NOT NULL DEFAULT (gen_random_uuid()),
    first_name			character varying(100) NOT NULL,
    last_name			character varying(100) NOT NULL,
    type				integer NOT NULL,
	organizer_id		uuid NOT NULL,
    iso2country_code	integer NOT NULL,
    city				character varying(50) NOT NULL,
    email				character varying(100) NULL,
    phone				character varying(50) NULL,
    additional_details	jsonb NULL,
	
    CONSTRAINT "PK_Beneficiaries" PRIMARY KEY (id),
    CONSTRAINT "UC_Email" UNIQUE (email)
);

ALTER TABLE campaign.campaigns
ADD CONSTRAINT "FK_Campaigns_Beneficiaries_BeneficiaryId" FOREIGN KEY (beneficiary_id) REFERENCES campaign.beneficiaries (id) ON DELETE CASCADE;

CREATE INDEX "IX_Campaigns_BeneficiaryId" ON campaign.campaigns (beneficiary_id);

COMMIT;