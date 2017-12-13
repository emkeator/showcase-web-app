INSERT INTO users (firstname, lastname, auth_id)
VALUES ( $1, $2, $3 )
RETURNING *;