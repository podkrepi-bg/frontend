BEGIN;

  CREATE OR REPLACE FUNCTION campaign.trigger_set_updated_at()
  RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;

  -- by default all functions are accessible to the public, we need to remove that
  -- and define our specific access rules
  REVOKE ALL PRIVILEGES ON FUNCTION campaign.trigger_set_updated_at() FROM public;
  ALTER FUNCTION campaign.soft_delete_record() OWNER TO postgres;

COMMIT;
