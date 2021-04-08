BEGIN;

CREATE TABLE IF NOT EXISTS app.contacts (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT,
    first_name    TEXT,
    last_name     TEXT,
    phone         TEXT,
    company       TEXT,
    message       TEXT,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ,
    deleted_at    TIMESTAMPTZ,

    CHECK (LENGTH(email) > 2)
);

COMMIT;
