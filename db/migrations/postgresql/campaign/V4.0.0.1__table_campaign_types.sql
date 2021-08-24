BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "campaign"."campaign_types" (
    "id"                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    "name"                character varying(50) NOT NULL,
    "description"         character varying(200) NULL,

    CONSTRAINT "PK_CampaignTypes" PRIMARY KEY ("id")
);

COMMIT;
