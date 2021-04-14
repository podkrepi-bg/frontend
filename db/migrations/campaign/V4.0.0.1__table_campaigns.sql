BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "CampaignTypes" (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "Name" character varying(50) NOT NULL,
    "DescriptionKey" character varying(50) NULL,
    CONSTRAINT "PK_CampaignTypes" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS "CampaignSubTypes" (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "Name" character varying(50) NOT NULL,
    "DescriptionKey" character varying(50) NULL,
    "CampaignTypeId" uuid NOT NULL,
    CONSTRAINT "PK_CampaignSubTypes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_CampaignSubTypes_CampaignTypes_CampaignTypeId" FOREIGN KEY ("CampaignTypeId") REFERENCES "CampaignTypes" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Campaigns" (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "State" integer NOT NULL,
    "InitiatorId" uuid NOT NULL,
    "BeneficiaryId" uuid NOT NULL,
    "OperatorId" uuid NOT NULL,
    "CampaignTypeId" uuid NOT NULL,
    "CampaignSubTypeId" uuid NOT NULL,
    "TitleKey" character varying(50) NOT NULL,
    "ShortDescriptionKey" character varying(50) NOT NULL,
    "FullDescriptionKey" character varying(50) NULL,
    "TargetAmount" numeric NOT NULL,
    "Currency" integer NOT NULL,
    "CreationDate" timestamptz DEFAULT now()NOT NULL,
    "Verified" boolean NOT NULL,
    "Deadline" timestamptz NULL,
    "Recurring" boolean NOT NULL,
    "OptionalDetails" text NOT NULL,
    CONSTRAINT "PK_Campaigns" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Campaigns_CampaignSubTypes_CampaignSubTypeId" FOREIGN KEY ("CampaignSubTypeId") REFERENCES "CampaignSubTypes" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Campaigns_CampaignTypes_CampaignTypeId" FOREIGN KEY ("CampaignTypeId") REFERENCES "CampaignTypes" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Campaigns_CampaignSubTypeId" ON "Campaigns" ("CampaignSubTypeId");

CREATE INDEX "IX_Campaigns_CampaignTypeId" ON "Campaigns" ("CampaignTypeId");

CREATE INDEX "IX_CampaignSubTypes_CampaignTypeId" ON "CampaignSubTypes" ("CampaignTypeId");

COMMIT;