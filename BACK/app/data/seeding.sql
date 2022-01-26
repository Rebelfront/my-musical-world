CREATE FUNCTION add_user(json) RETURNS "USER" AS $$
INSERT INTO "USER" (mail, lastname, firstname, pseudo, "password")
VALUES ($1 ->> 'mail', 
		$1 ->> 'lastanme', 
		$1 ->> 'firstanme', 
		$1 ->> 'pseudo', 
		$1 ->> 'password'
) RETURNING *;
$$ LANGUAGE SQL STRICT; 
