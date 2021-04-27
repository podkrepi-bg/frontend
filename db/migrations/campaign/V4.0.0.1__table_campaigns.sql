BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS campaign.CampaignTypes (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "Name" character varying(50) NOT NULL,
    "Description" character varying(50) NULL,
    CONSTRAINT "PK_CampaignTypes" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS campaign.CampaignSubTypes (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "Name" character varying(50) NOT NULL,
    "Description" character varying(50) NULL,
    "CampaignTypeId" uuid NOT NULL,
    CONSTRAINT "PK_CampaignSubTypes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_CampaignSubTypes_CampaignTypes_CampaignTypeId" FOREIGN KEY ("CampaignTypeId") REFERENCES campaign.CampaignTypes ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaign.Campaigns (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "State" integer NOT NULL,
    "InitiatorId" uuid NOT NULL,
    "BeneficiaryId" uuid NOT NULL,
    "OperatorId" uuid NOT NULL,
    "CampaignTypeId" uuid NOT NULL,
    "CampaignSubTypeId" uuid NOT NULL,
    "Title" character varying(50) NOT NULL,
    "ShortDescription" character varying(50) NOT NULL,
    "FullDescription" character varying(50) NULL,
    "TargetAmount" numeric NOT NULL,
    "Currency" integer NOT NULL,
    "CreationDate" timestamptz DEFAULT now()NOT NULL,
    "Verified" boolean NOT NULL,
    "Deadline" timestamptz NULL,
    "Recurring" boolean NOT NULL,
    "OptionalDetails" text NOT NULL,
    CONSTRAINT "PK_Campaigns" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Campaigns_CampaignSubTypes_CampaignSubTypeId" FOREIGN KEY ("CampaignSubTypeId") REFERENCES campaign.CampaignSubTypes ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Campaigns_CampaignTypes_CampaignTypeId" FOREIGN KEY ("CampaignTypeId") REFERENCES campaign.CampaignTypes ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Campaigns_CampaignSubTypeId" ON campaign.Campaigns ("CampaignSubTypeId");

CREATE INDEX "IX_Campaigns_CampaignTypeId" ON campaign.Campaigns ("CampaignTypeId");

CREATE INDEX "IX_CampaignSubTypes_CampaignTypeId" ON campaign.CampaignSubTypes ("CampaignTypeId");

COMMIT;