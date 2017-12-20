UPDATE trips
SET departure_port = $1,
    destination_port = $2,
    hotel = $3,
    departure_port_code = $4,
    destination_port_code = $5,
    destination_hotel_code = $6,    
    departure_date = $7,
    return_date = $8
    budget = $9
WHERE user_id = $10
