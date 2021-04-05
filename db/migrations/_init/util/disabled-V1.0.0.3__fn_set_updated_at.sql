BEGIN;

CREATE FUNCTION util.set_updated_at() RETURNS TRIGGER AS
$$
    BEGIN
        new.updated_at = now();
        RETURN new;
    END;
$$
LANGUAGE plpgsql;
-- by default all functions are accessible to the public, we need to remove that
-- and define our specific access rules
REVOKE ALL PRIVILEGES ON FUNCTION util.set_updated_at() FROM public;

COMMIT;
