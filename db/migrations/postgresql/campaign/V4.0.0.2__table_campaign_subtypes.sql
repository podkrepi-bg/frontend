BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "campaign"."campaign_subtypes" (
    "id"                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    "name"                character varying(50) NOT NULL,
    "description"         character varying(200) NULL,
    "campaign_type_id"    uuid NOT NULL,

    CONSTRAINT "PK_CampaignSubTypes" PRIMARY KEY ("id"),
    CONSTRAINT "FK_CampaignSubTypes_CampaignTypes_CampaignTypeId"
      FOREIGN KEY ("campaign_type_id") REFERENCES "campaign"."campaign_types" ("id")
        ON DELETE CASCADE
);

COMMIT;
