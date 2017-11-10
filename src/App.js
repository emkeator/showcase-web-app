import React, { Component } from 'react';
import './main.css';
import {Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

class App extends Component {
  constructor() {
      super();
      this.state = {
        userOnSession: true, //MAKE ME FALSE WHEN LOGIN IS SET UP!!!
        trips: [
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "London",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Edinburgh",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "New York City",
                    "destination_port": "Auckland",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Auckland",
                    "destination_port": "Sydney",
                    "completed": true,
                    "packing_list": []
                },
                {
                    "departure_port": "Bali",
                    "destination_port": "Bora Bora",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Honolulu",
                    "destination_port": "Melbourne",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Berlin",
                    "destination_port": "Oslo",
                    "completed": true,
                    "packing_list": []
                },
                {
                    "departure_port": "Tulum",
                    "destination_port": "San Diego",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Cancun",
                    "destination_port": "Seattle",
                    "completed": true,
                    "packing_list": []
                },
                {
                    "departure_port": "Salt Lake City",
                    "destination_port": "Banff",
                    "completed": true,
                    "packing_list": []
                },
                  {
                    "departure_port": "Rome",
                    "destination_port": "Athens",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "London",
                    "destination_port": "Florence",
                    "completed": true,
                    "packing_list": []
                },
                {
                    "departure_port": "Cairo",
                    "destination_port": "Quebec",
                    "completed": false,
                    "packing_list": []
                },
                {
                    "departure_port": "Washington, D.C.",
                    "destination_port": "Washington, D.C.",
                    "completed": false,
                    "packing_list": []
                }
            ]
      }

      this.toggleTripStatus = this.toggleTripStatus.bind(this);
      this.createTrip = this.createTrip.bind(this);
  }

  componentWillMount(){
    //check if user on session - if yes, change state.userOnSession to true
  }

  toggleTripStatus(index){
    let x = this.state.trips.slice(0);
    x[index].completed = !x[index].completed;
    let tripToUpdate = x[index];
    this.setState({
        trips: x
    })
    //axios call to update tripToUpdate in db
  }

  createTrip(tripObject){
    let x = this.state.trips.slice(0);
    x.unshift(tripObject);
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

            <Home trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} createTrip={this.createTrip}/>
            :
            <Login/>
        }
      </div>
    );
  }
}

export default App;
