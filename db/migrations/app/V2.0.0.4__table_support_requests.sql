BEGIN;

CREATE TABLE IF NOT EXISTS app.support_requests (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person        JSONB,
    support_data  JSONB,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ,
    deleted_at    TIMESTAMPTZ
);

COMMIT;
