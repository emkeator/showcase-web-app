require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      http = require('http'),
      sockets = require('socket.io'),
      app = express(),
      server = http.createServer(app),   
      io = sockets(server),   
      port = process.env.PORT;


app.use(bodyParser.json());
app.use(cors());


// app.use(sessions)


//========= Endpoints =========//
// app.get()


//========= Auth 0 Endpoints =========//






app.listen(port, () => console.log(`I'm listening on port ` + port));

//========= Socket.io =========//
