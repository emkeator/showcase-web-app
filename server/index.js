require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      axios = require('axios'),
      session = require('express-session'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      http = require('http'),
      sockets = require('socket.io'),
      IC = require('iatacodes'),
      ic = new IC(`${process.env.IATA_KEY}`)
      app = express(),
      server = http.createServer(app),   
      io = sockets(server),   
      port = process.env.PORT;


app.use(bodyParser.json());
app.use(cors());


// app.use(sessions)


//========= Endpoints =========//

//POST departure city code
app.post('/api/departurePortCodes', (req, res) => {
      let { departure_port } = req.body;  
      console.log(req.body, departure_port)    
      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${departure_port}`)
      .then(apiRes => {
            if(apiRes.data.length === 0){
                  res.status(200).json(`Departure city is not valid! Try again.`);
            }
            res.status(200).send(apiRes.data[0])
      }, err => err.status(404).json('Error'))
})

//POST destination city code
app.post('/api/destinationPortCodes', (req, res) => {
      let { destination_port } = req.body;
      console.log(req.body, destination_port)    
      
      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${destination_port}`)
      .then(apiRes => {
            if(apiRes.data.length === 0){
                  res.status(200).json(`Destination city is not valid! Try again.`);
            }
            res.status(200).send(apiRes.data[0])
      }, err => err.status(404).json('Error'))
})

//========= Auth 0 Endpoints =========//






app.listen(port, () => console.log(`I'm listening on port ` + port));

//========= Socket.io =========//
