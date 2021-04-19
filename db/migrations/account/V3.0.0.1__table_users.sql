BEGIN;

CREATE TABLE IF NOT EXISTS account.users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT,
    first_name    TEXT,
    last_name     TEXT,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ,
    deleted_at    TIMESTAMPTZ,

    CHECK (LENGTH(email) > 2)
);

CREATE UNIQUE INDEX account_users_email_unique_idx
    ON account.users (email);

-- CREATE TRIGGER trg_account_users_set_updated_at
--     BEFORE UPDATE
--     ON account.users
--     FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

-- CREATE TRIGGER trg_account_users_soft_delete
--     BEFORE DELETE
--     ON account.users
--     FOR EACH ROW EXECUTE PROCEDURE util.soft_delete_record();

COMMIT;
