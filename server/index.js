require('dotenv').config()

const lodash = require('lodash'),
      express = require('express'),
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
      db_connection =  {
            host: process.env.HEROKU_HOST,
            port: process.env.HEROKU_PORT,
            database: process.env.HEROKU_DB,
            user: process.env.HEROKU_USER,
            password: process.env.HEROKU_PSWD,
            ssl: true
      },
      auth0_connection = {
            domain: process.env.AUTH_DOMAIN,
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT_SECRET,
            callbackURL: process.env.AUTH_CALLBACK
      },
      port = process.env.PORT


app.use(bodyParser.json());
app.use(cors());

app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(__dirname + '/../build'))

massive(db_connection).then(db => app.set('db', db))

passport.use(new Auth0Strategy({
            domain: process.env.AUTH_DOMAIN,
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT_SECRET,
            callbackURL: process.env.AUTH_CALLBACK,
            scope: "openid email profile"
      }, function(accessToken, refreshToken, extraParams, profile, done){
      const db = app.get('db')
      db.find_user([profile._json.sub.split('|')[1]])
      .then(user => {
            if(user[0]){
                  done(null, {id: user[0].id, name: user[0].firstname})
            } else {
                  let name = profile.displayName.split(' ')
                  db.create_user([name[0], name[1], profile._json.sub.split('|')[1]])
                  .then(user => {
                        done(null, {id: user[0].id, name: user[0].firstname})
                  })
            }
      })
}))

passport.serializeUser(function(user, done) {
      done(null, user);
});

passport.deserializeUser(function(obj, done) {
      app.get('db').find_session_user([obj.id])
      .then( user => {
            done(null, user[0]);
      })
      done(null, obj)
});

//========= Endpoints =========//

//POST departure city code
app.post('/api/departurePortCodes', (req, res) => {
      let { departure_port } = req.body;  
      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${departure_port}`)
      .then(apiRes => {
            if(apiRes.data.length === 0){
                  res.status(200).json(`Departure city is not valid! Try again.`);
            }
            res.status(200).send(apiRes.data)
      })
      .catch(err => res.status(404).send(err))
})

//POST destination city code
app.post('/api/destinationPortCodes', (req, res) => {
      let { destination_port } = req.body;
      // console.log(req.body, destination_port)    
      
      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${destination_port}`)
      .then(apiRes => {
            if(apiRes.data.length === 0){
                  res.status(200).json(`Destination city is not valid! Try again.`);
            }
            res.status(200).send(apiRes.data)
      })
      .catch(err => res.status(404).send(err))
})




//POST create trip

//PUT update trip

//DELETE delete trip



//========= Auth 0 Endpoints =========//

//Login
app.get('/auth', passport.authenticate('auth0'));

//Callback
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3004/#/',
  failureRedirect: 'http://localhost:3004/#/login'
}))

//Auth Me
app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(200).send('User not found')
  } else {
    return res.status(200).send(req.user)
  }
})

//Logout
app.get('/auth/logout', (req, res) => {
  req.logOut()
  return res.redirect(302, 'http://localhost:3004/#/login')
})




app.listen(port, () => console.log(`I'm listening on port ` + port))

//========= Socket.io =========//


//join new room with admin

//send message


