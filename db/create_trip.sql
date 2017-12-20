INSERT INTO trips (
    user_id,
    departure_port,
    destination_port,
    hotel,
    departure_port_code,
    destination_port_code,
    destination_hotel_code,    
    completed,
    departure_date,
    return_date,
    budget)
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;