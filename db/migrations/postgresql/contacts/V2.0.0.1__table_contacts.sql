BEGIN;

CREATE TABLE IF NOT EXISTS "contacts"."contacts" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email"         CITEXT,
    "first_name"    varchar,
    "last_name"     varchar,
    "phone"         varchar,
    "company"       varchar,
    "message"       TEXT,
    "created_at"    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at"    TIMESTAMPTZ,
    "deleted_at"    TIMESTAMPTZ,

    CHECK (LENGTH(email) > 2)
);

COMMIT;
