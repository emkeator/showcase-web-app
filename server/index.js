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
      socket = require('socket.io'),
      IC = require('iatacodes'),
      ic = new IC(`${process.env.IATA_KEY}`)
      app = express(),
      S3 = require('./S3'),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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


//========= Top-Level Middleware =========//
// app.use(bodyParser.json())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(cors())

app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(__dirname + '/../build'))

//========= DB Massive Connection =========//
massive(db_connection).then(db => app.set('db', db))

//========= Auth0 Passport =========//
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
      done(null, user)
})

passport.deserializeUser(function(obj, done) {
      app.get('db').find_session_user([obj.id])
      .then( user => {
            if(user.length) {
                  done(null, user[0]);
            } else {
                  done(null, null);
            }
      })
})


//========= Amazon S3 =========//
S3(app)

//========= Endpoints =========//

//POST departure city code
app.post('/api/departurePortCodes', (req, res) => {
      let { departure_port } = req.body; 

      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${departure_port}`)
      .then(apiRes => {
            res.status(200).send(apiRes.data)
      })
      .catch(err => res.status(404).send(err))
})

//POST destination city code
app.post('/api/destinationPortCodes', (req, res) => {
      let { destination_port } = req.body;
      
      axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_KEY}&term=${destination_port}`)
      .then(apiRes => {
            res.status(200).send(apiRes.data)
      })
      .catch(err => res.status(404).send(err))
})

//GET trips - gets all of a user's trips
app.get('/api/getTrips/:id', (req, res) => {
    app.get('db').get_trips(req.params.id).then( data => {
          res.status(200).send(data)
    })
})

//GET trip completion update
app.get('/api/updateTripCompletion/:id/:completion', (req, res) => {
    let { id, completion } = req.params
    console.log(id, completion)
    app.get('db').update_trip_completion(completion, id).then(back => console.log(back))
    res.status(200).send('yes')
})

//POST create trip - handles new trips, recreating trips
app.post('/api/createTrip', (req, res) => {
    let { trip } = req.body
    app.get('db').create_trip(
      [trip.user_id,
      trip.departure_port,
      trip.destination_port,
      trip.hotel,
      trip.departure_port_code,
      trip.destination_port_code,
      trip.destination_hotel_code,    
      trip.completed,
      trip.departure_date,
      trip.return_date,
      trip.budget]
    ).then(newTrip => {
          res.status(200).send(newTrip)
    })
})

//PUT update trip - handles completion, edits
app.put('/api/updateTrip', (req, res) => {
      let { trip } = req.body
    app.get('db').update_trip_info([

    ])

//     departure_port = $1,
//     destination_port = $2,
//     hotel = $3,
//     departure_port_code = $4,
//     destination_port_code = $5,
//     destination_hotel_code = $6,    
//     departure_date = $7,
//     return_date = $8
//     budget = $9
// WHERE user_id = $10
})

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

//Auth Login Page
app.get('/auth/me/login', (req, res, next) => {
  console.log(req.user)
  if (req.user) {
    return res.status(200).send('User found')
  } else {
    return res.status(200).send('No one logged in.')
  }
})

//Logout
app.get('/auth/logout', (req, res) => {
  req.logOut()
  return res.redirect(302, 'http://localhost:3004/#/login')
})




// app.listen(port, () => console.log(`I'm listening on port ` + port))
const io = socket(app.listen(port, () => console.log(`I'm listening on port ` + port)))

//========= Socket.io =========//

io.on('connection', socket => {
      console.log('User connected')

      socket.on('join room', data => {
            console.log('Room joined', data.room)
            socket.join(data.room)
            io.to(data.room).emit('room joined')
      })

      socket.on('message sent', data => {
            io.to(data.room).emit('message dispatched', data.message)
            let stamp = new Date()
            let minutes = stamp.getMinutes()
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            let messageBack = {
                  from: 'admin',
                  timeStamp: `${months[stamp.getMonth()]} ${stamp.getDate()} - ${stamp.getHours() - 12}:${minutes}`,
                  content: 'Sorry, this app was only made as a showcase. You are connected to a socket.io room. If this were a real app, a travel agent admin would be logged into this socket room with you to answer questions. Try uploading a photo!'
            }
            setTimeout(() => {
                  io.to(data.room).emit('message dispatched', messageBack)
            }, 700)
            
            
      })

      socket.on('disconnect', () => console.log('User disconnected.'))
})


