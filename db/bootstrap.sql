CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(80),
    lastname VARCHAR(80),
    auth_id VARCHAR(100) NOT NULL,
    socket_id VARCHAR (100)
);

    -- FOREIGN KEY(user_id) REFERENCES users(id)


CREATE TABLE IF NOT EXISTS trips
(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100),
    departure_port VARCHAR(100),
    destination_port VARCHAR(100),
    hotel TEXT,
    departure_port_code TEXT,
    destination_port_code TEXT,
    destination_hotel_code TEXT,    
    completed BOOLEAN,
    departure_date TEXT,
    return_date TEXT,
    budget TEXT,
);

INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Salt Lake City', 'London', 'St. Regis Marylebone', 'SLC', 'LHR', 'LHR', FALSE, ' ', ' ', ' ');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Salt Lake City', 'Edinburgh', ' ', 'SLC', 'EDI', 'EDI', FALSE, ' ', ' ', ' ');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'New York City', 'Auckland', ' ', 'NYC', 'AKL', 'AKL', FALSE, ' ', ' ', '3000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Auckland', 'Sydney', 'Marriott Harbour Bridge', 'AKL', 'SYD', 'SYD', TRUE, '01/01/17', '02/04/17', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Sydney', 'Bali', 'Overwater Suites', 'SYD', 'BPN', 'BPN', FALSE, '02/02/18', '02/09/18', '5000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Honolulu', 'Melbourne', 'Marriott Main Stree', 'HNL', 'MEL', 'MEL', FALSE, '12/13/19', '12/22/19', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Tulum', 'San Diego', 'Hotel Coronado', 'MEX', 'SAN', 'SAN', FALSE, '04/04/18', '04/09/18', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Cancun', 'Seattle', 'Marriott Waterfront', 'CUN', 'SEA', 'SEA', FALSE, '09/09/17', '09/17/17', '3500.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (9, 'Salt Lake City', 'Banff', 'St. Regis Banff', 'SLC', 'YYC', 'YYC', TRUE, '12/05/15', '12/15/15', '6000.00');

INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Salt Lake City', 'London', 'St. Regis Marylebone', 'SLC', 'LHR', 'LHR', FALSE, ' ', ' ', ' ');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Salt Lake City', 'Edinburgh', ' ', 'SLC', 'EDI', 'EDI', FALSE, ' ', ' ', ' ');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'New York City', 'Auckland', ' ', 'NYC', 'AKL', 'AKL', FALSE, ' ', ' ', '3000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Auckland', 'Sydney', 'Marriott Harbour Bridge', 'AKL', 'SYD', 'SYD', TRUE, '01/01/17', '02/04/17', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Sydney', 'Bali', 'Overwater Suites', 'SYD', 'BPN', 'BPN', FALSE, '02/02/18', '02/09/18', '5000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Honolulu', 'Melbourne', 'Marriott Main Stree', 'HNL', 'MEL', 'MEL', FALSE, '12/13/19', '12/22/19', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Tulum', 'San Diego', 'Hotel Coronado', 'MEX', 'SAN', 'SAN', FALSE, '04/04/18', '04/09/18', '4000.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Cancun', 'Seattle', 'Marriott Waterfront', 'CUN', 'SEA', 'SEA', FALSE, '09/09/17', '09/17/17', '3500.00');
INSERT INTO trips (user_id, departure_port, destination_port, hotel, departure_port_code, destination_port_code, destination_hotel_code, completed, departure_date, return_date, budget) 
    VALUES (8, 'Salt Lake City', 'Banff', 'St. Regis Banff', 'SLC', 'YYC', 'YYC', TRUE, '12/05/15', '12/15/15', '6000.00');
