import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Flights extends Component{

    render(){
        return(
            <ul id="Flights">
                <div className="flightForm">
                    <input placeholder="From..."/>
                    <input placeholder="To..."/>
                    <button>Search Flights</button>
                    <button>Create Trip</button>                    
                </div>
                {this.state.flights.map((e, i) => {
                    return <li className={e.completed ? "completed" : ''} 
                               key={`${i}${e.departure_port}`}
                               ref={`${i}${e.departure_port}`}
                               onClick={() => this.toggleTrip(i, `${i}${e.departure_port}`)}>

                                {e.departure_port} ⟶ {e.destination_port}
                                
                            </li>
                })}
            </ul>
        )
    }
}