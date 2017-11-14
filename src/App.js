import React, { Component } from 'react'
import './main.css'
import {Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'

class App extends Component {
  constructor() {
      super()
      this.state = {
        userOnSession: true, //MAKE ME FALSE WHEN LOGIN IS SET UP!!!
        trips: [
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "London",
                    "departure_port_code": "SLC",
                    "destination_port_code": "LHR",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Edinburgh",
                    "departure_port_code": "SLC",
                    "destination_port_code": "EDI",
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
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Auckland",
                    "destination_port": "Sydney",
                    "departure_port_code": "AKL",
                    "destination_port_code": "SYD",
                    "completed": true,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Bali",
                    "destination_port": "Bora Bora",
                    "departure_port_code": "BPN",
                    "destination_port_code": "BPN",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Honolulu",
                    "destination_port": "Melbourne",
                    "departure_port_code": "HNL",
                    "destination_port_code": "MEL",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Berlin",
                    "destination_port": "Oslo",
                    "departure_port_code": "SLC",
                    "destination_port_code": "OSL",
                    "completed": true,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Tulum",
                    "destination_port": "San Diego",
                    "departure_port_code": "MEX",
                    "destination_port_code": "SAN",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Cancun",
                    "destination_port": "Seattle",
                    "departure_port_code": "CUN",
                    "destination_port_code": "SEA",
                    "completed": true,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Banff",
                    "departure_port_code": "SLC",
                    "destination_port_code": "YYC",
                    "completed": true,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                  {
                    "departure_port": "Rome",
                    "destination_port": "Athens",
                    "departure_port_code": "FCO",
                    "destination_port_code": "ATH",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "London",
                    "destination_port": "Florence",
                    "departure_port_code": "LHR",
                    "destination_port_code": "FLR",
                    "completed": true,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Cairo",
                    "destination_port": "Quebec",
                    "departure_port_code": "CAI",
                    "destination_port_code": "YBQ",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                },
                {
                    "departure_port": "Washington, D.C.",
                    "destination_port": "Washington, D.C.",
                    "departure_port_code": "DCA",
                    "destination_port_code": "DCA",
                    "completed": false,
                    "departure_date": "",
                    "return_date": "",
                    "hotel": "",
                    "budget": ""
                }
            ]
      }

      this.toggleTripStatus = this.toggleTripStatus.bind(this)
      this.createTrip = this.createTrip.bind(this)
      this.updateTrip = this.updateTrip.bind(this)
      this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentWillMount(){
    //check if user on session - if yes, change state.userOnSession to true
  }

  toggleTripStatus(index){
    let x = this.state.trips.slice(0)
    x[index].completed = !x[index].completed
    let tripToUpdate = x[index]
    this.setState({
        trips: x
    })
    //axios call to update tripToUpdate in db
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
        </header>
        {
          this.state.userOnSession ?

            <Home trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} createTrip={this.createTrip} updateTrip={this.updateTrip} deleteTrip={this.deleteTrip}/>
            :
            <Login/>
        }
      </div>
    )
  }
}

export default App
