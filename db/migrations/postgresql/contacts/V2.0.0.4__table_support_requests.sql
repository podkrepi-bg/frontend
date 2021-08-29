BEGIN;

CREATE TABLE IF NOT EXISTS "contacts"."support_requests" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "person"        JSONB,
    "support_data"  JSONB,
    "created_at"    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at"    TIMESTAMPTZ,
    "deleted_at"    TIMESTAMPTZ
);

COMMIT;
