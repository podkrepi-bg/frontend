BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS campaign.campaign_types (
    id                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    name                character varying(50) NOT NULL,
    description         character varying(200) NULL,

    CONSTRAINT "PK_CampaignTypes" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS campaign.campaign_subtypes (
    id                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    name                character varying(50) NOT NULL,
    description         character varying(200) NULL,
    campaign_type_id    uuid NOT NULL,

    CONSTRAINT "PK_CampaignSubTypes" PRIMARY KEY (id),
    CONSTRAINT "FK_CampaignSubTypes_CampaignTypes_CampaignTypeId" FOREIGN KEY (campaign_type_id) REFERENCES campaign.campaign_types (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaign.campaigns (
    id                  uuid NOT NULL DEFAULT (gen_random_uuid()),
    state               integer NOT NULL,
    initiator_id        uuid NOT NULL,
    beneficiary_id      uuid NOT NULL,
    operator_id         uuid NOT NULL,
    campaign_type_id    uuid NOT NULL,
    campaign_subtype_id uuid NOT NULL,
    title               character varying(200) NOT NULL,
    short_description   character varying(500) NULL,
    full_description    text NULL,
    target_amount       numeric NOT NULL,
    currency            integer NOT NULL,
    verified            boolean NOT NULL,
    deadline            timestamptz NULL,
    recurring           boolean NOT NULL,
    optional_details    json NULL,
    created_at          timestamptz DEFAULT now() NOT NULL,
    updated_at          timestamptz,
    deleted_at          timestamptz,

    CONSTRAINT "PK_Campaigns" PRIMARY KEY (id),
    CONSTRAINT "FK_Campaigns_CampaignSubTypes_CampaignSubTypeId" FOREIGN KEY (campaign_subtype_id) REFERENCES campaign.campaign_subtypes (id) ON DELETE CASCADE,
    CONSTRAINT "FK_Campaigns_CampaignTypes_CampaignTypeId" FOREIGN KEY (campaign_type_id) REFERENCES campaign.campaign_types (id) ON DELETE CASCADE
);

CREATE INDEX "IX_Campaigns_CampaignSubTypeId" ON campaign.campaigns (campaign_subtype_id);

CREATE INDEX "IX_Campaigns_CampaignTypeId" ON campaign.campaigns (campaign_type_id);

CREATE INDEX "IX_CampaignSubTypes_CampaignTypeId" ON campaign.campaign_subtypes (campaign_type_id);

COMMIT;