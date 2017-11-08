CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(80),
    lastname VARCHAR(80),
    auth_id VARCHAR(100) NOT NULL,
    socket_id VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS trips
(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100),
    departure_port VARCHAR(100),
    destination_port VARCHAR(100),
    packing_list TEXT
);

