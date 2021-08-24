BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "campaign"."campaigns" (
    "id"                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    "state"               integer NOT NULL,
    "initiator_id"        uuid NOT NULL,
    "beneficiary_id"      uuid NOT NULL,
    "operator_id"         uuid NOT NULL,
    "campaign_type_id"    uuid NOT NULL,
    "campaign_subtype_id" uuid NULL,
    "title"               varchar(200) NOT NULL,
    "short_description"   varchar(500) NULL,
    "full_description"    text NULL,
    "target_amount"       numeric NULL,
    "currency"            integer NULL,
    "deadline"            timestamptz NULL,
    "optional_details"    jsonb NULL,
    "created_at"          timestamptz DEFAULT now() NOT NULL,
    "updated_at"          timestamptz,
    "deleted_at"          timestamptz,

    CONSTRAINT "PK_Campaigns" PRIMARY KEY ("id"),
    CONSTRAINT "FK_Campaigns_CampaignSubTypes_CampaignSubTypeId"
      FOREIGN KEY ("campaign_subtype_id")
        REFERENCES "campaign"."campaign_subtypes" ("id")
          ON DELETE CASCADE,
    CONSTRAINT "FK_Campaigns_CampaignTypes_CampaignTypeId"
      FOREIGN KEY ("campaign_type_id")
        REFERENCES "campaign"."campaign_types" ("id")
          ON DELETE CASCADE,
    CONSTRAINT "FK_Campaigns_Beneficiaries_BeneficiaryId"
      FOREIGN KEY ("beneficiary_id")
        REFERENCES "campaign"."beneficiaries" ("id")
          ON DELETE CASCADE
);

-- Triggers
CREATE TRIGGER trigger_set_deleted_at
  BEFORE UPDATE ON "campaign"."campaigns"
  FOR EACH ROW
  EXECUTE PROCEDURE soft_delete_record();

CREATE RULE "_SOFT_DELETE" AS
    ON DELETE TO "campaigns"
    DO INSTEAD
      UPDATE "campaigns" SET "deleted_at" = CURRENT_TIMESTAMP
        WHERE "campaigns".id = old.id;

CREATE INDEX "IX_Campaigns_BeneficiaryId" ON "campaign"."campaigns" ("beneficiary_id");

CREATE INDEX "IX_Campaigns_CampaignSubTypeId" ON "campaign"."campaigns" ("campaign_subtype_id");

CREATE INDEX "IX_Campaigns_CampaignTypeId" ON "campaign"."campaigns" ("campaign_type_id");

CREATE INDEX "IX_CampaignSubTypes_CampaignTypeId" ON "campaign"."campaign_subtypes" ("campaign_type_id");

COMMIT;
