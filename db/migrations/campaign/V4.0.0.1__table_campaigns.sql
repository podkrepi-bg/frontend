BEGIN;

CREATE TABLE campaign.campaigns (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          TEXT,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ,
    deleted_at    TIMESTAMPTZ

    CHECK (LENGTH(name) > 2)
);

COMMIT;
