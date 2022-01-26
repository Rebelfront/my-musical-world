-- Revert MyMusicalWorld:functions from pg

BEGIN;

DROP FUNCTION add_user(json);

DROP FUNCTION update_user(json);

COMMIT;
