import React, { Component } from 'react'
import './main.css'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import axios from 'axios'

class App extends Component {
  constructor() {
      super()
      this.state = {
        userOnSession: false, //MAKE ME FALSE WHEN LOGIN IS SET UP!!!
        trips: [
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "London",
                    "departure_port_code": "SLC",
                    "destination_port_code": "LHR",
                    "destination_hotel_code": "LHR",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "St. Regis Marylebone",
                    "budget": ""
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Edinburgh",
                    "departure_port_code": "SLC",
                    "destination_port_code": "EDI",
                    "destination_hotel_code": "EDI",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "New York City",
                    "destination_port": "Auckland",
                    "departure_port_code": "NYC",
                    "destination_port_code": "AKL",
                    "destination_hotel_code": "AKL",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": "3000.00"
                },
                {
                    "departure_port": "Auckland",
                    "destination_port": "Sydney",
                    "departure_port_code": "AKL",
                    "destination_port_code": "SYD",
                    "destination_hotel_code": "SYD",
                    "completed": true,
                    "departure_date": "01/01/17",
                    "return_date": "02/04/17",
                    "hotel": "Marriott Harbor Bridge",
                    "budget": "4000.00"
                },
                {
                    "departure_port": "Sydney",
                    "destination_port": "Bali",
                    "departure_port_code": "SYD",
                    "destination_port_code": "BPN",
                    "destination_hotel_code": "BPN",
                    "completed": false,
                    "departure_date": "02/02/18",
                    "return_date": "02/09/18",
                    "hotel": "Overwater Suites",
                    "budget": "5000.00"
                },
                {
                    "departure_port": "Honolulu",
                    "destination_port": "Melbourne",
                    "departure_port_code": "HNL",
                    "destination_port_code": "MEL",
                    "destination_hotel_code": "MEL",
                    "completed": false,
                    "departure_date": "12/13/19",
                    "return_date": "12/22/19",
                    "hotel": "Marriott Main Street",
                    "budget": "4000.00"
                },
                {
                    "departure_port": "Berlin",
                    "destination_port": "Oslo",
                    "departure_port_code": "SLC",
                    "destination_port_code": "OSL",
                    "destination_hotel_code": "OSL",
                    "completed": true,
                    "departure_date": "06/07/17",
                    "return_date": "06/17/17",
                    "hotel": "Babygulrot Suites",
                    "budget": "5000.00"
                },
                {
                    "departure_port": "Tulum",
                    "destination_port": "San Diego",
                    "departure_port_code": "MEX",
                    "destination_port_code": "SAN",
                    "destination_hotel_code": "SAN",
                    "completed": false,
                    "departure_date": "04/04/18",
                    "return_date": "04/16/18",
                    "hotel": "Hotel Coronado",
                    "budget": "4000.00"
                },
                {
                    "departure_port": "Cancun",
                    "destination_port": "Seattle",
                    "departure_port_code": "CUN",
                    "destination_port_code": "SEA",
                    "destination_hotel_code": "SEA",
                    "completed": true,
                    "departure_date": "09/17/17",
                    "return_date": "09/28/17",
                    "hotel": "Marriott Waterfront",
                    "budget": "3500.00"
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Banff",
                    "departure_port_code": "SLC",
                    "destination_port_code": "YYC",
                    "destination_hotel_code": "YYC",
                    "completed": true,
                    "departure_date": "12/05/15",
                    "return_date": "12/15/15",
                    "hotel": "St. Regis Banff",
                    "budget": "6000.00"
                },
                  {
                    "departure_port": "Rome",
                    "destination_port": "Athens",
                    "departure_port_code": "FCO",
                    "destination_port_code": "ATH",
                    "destination_hotel_code": "ATH",
                    "completed": false,
                    "departure_date": "11/03/18",
                    "return_date": "11/08/18",
                    "hotel": "Hestian Hotel",
                    "budget": "1500.00"
                },
                {
                    "departure_port": "London",
                    "destination_port": "Florence",
                    "departure_port_code": "LHR",
                    "destination_port_code": "FLR",
                    "destination_hotel_code": "FLR",
                    "completed": true,
                    "departure_date": "10/10/17",
                    "return_date": "10/12/17",
                    "hotel": "Montage Florence",
                    "budget": "5000.00"
                },
                {
                    "departure_port": "Cairo",
                    "destination_port": "Quebec",
                    "departure_port_code": "CAI",
                    "destination_port_code": "YBQ",
                    "destination_hotel_code": "YBQ",
                    "completed": false,
                    "departure_date": "05/18/19",
                    "return_date": "05/28/19",
                    "hotel": "Quebecois Lodge",
                    "budget": "3000.00"
                },
                {
                    "departure_port": "Washington, D.C.",
                    "destination_port": "Washington, D.C.",
                    "departure_port_code": "DCA",
                    "destination_port_code": "DCA",
                    "destination_hotel_code": "DCA",
                    "completed": false,
                    "departure_date": "07/04/18",
                    "return_date": "07/04/18",
                    "hotel": "N/A",
                    "budget": "400.00"
                }
            ]
      }

      this.toggleTripStatus = this.toggleTripStatus.bind(this)
      this.createTrip = this.createTrip.bind(this)
      this.updateTrip = this.updateTrip.bind(this)
      this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentDidMount(){
    
  }

  toggleTripStatus(index, goAgain){
    if (goAgain) {
        let x = this.state.trips.slice(0)
        let trip = Object.assign({}, x[index], {completed: false, departure_date: '', return_date: ''})
        x.unshift(trip)
        this.setState({
            trips: x
        })
    } else {
        let x = this.state.trips.slice(0)
        x[index].completed = !x[index].completed
        let tripToUpdate = x[index]
        this.setState({
            trips: x
        })
    }
    
    //axios call to update tripToUpdate in db, or trips
  }

  createTrip(tripObject){
    let x = this.state.trips.slice(0)
    x.unshift(tripObject)
    this.setState({
        trips: x
    })
  }

  updateTrip(tripObject, index){
      let x = this.state.trips.slice(0)
      x[index] = tripObject
      this.setState({
          trips: x
      })
  }

  deleteTrip(index){
      let x = this.state.trips.slice(0)
      x.splice(index, 1)
      this.setState({
          trips: x
      })
  }

  render() {
    return (
      <div id="App">
        <header>
            <h1>On The Fly</h1>
            <a href="http://localhost:3003/auth/logout">Logout</a> 
        </header>
        <Switch>
            <Route exact path="/" render={() => {
                {/* axios.get('/auth/me')
                .then(res => {
                    if(res.data === 'User not found'){
                        return <PageNotFound displayString={'Please login.'}/>
                    } else {
                        return <Home trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} createTrip={this.createTrip} updateTrip={this.updateTrip} deleteTrip={this.deleteTrip}/>
                    }
                })
                .catch(err => console.log(err)) 
                return <PageNotFound displayString={'Error. Please login.'}/>  */}
                return <Home trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} createTrip={this.createTrip} updateTrip={this.updateTrip} deleteTrip={this.deleteTrip}/>
                
                
            }}/>
            <Route path="/login" component={Login}/>
            <Route path="/" render={() => {
                return <PageNotFound displayString={'Page not found.'}/>
            }}/>
        </Switch>
        
      </div>
    )
  }
}

export default App
