import React, {Component} from 'react';
import Header from '../Header/Header';
import Trips from '../Trips/Trips';
import Flights from '../Flights/Flights';

export default class Home extends Component{
    constructor() {
        super();
        this.state = {
            showFlights: true,
            showTrips: false,
            showPacking: false
        }
    }
    render(){
        return(
            <div id="Home">
                <Header firstname={"Emily"}/>
                <div className="homeWrapper">
                    <div className="mobileMakingWrapper">
                        <section className="choices">
                            <span>Flights</span>
                            <span>Trips</span>
                            <span>Packing</span>
                        </section>
                        {
                            this.state.showFlights ?
                                <Flights createTrip={this.props.createTrip}/> : null
                        }
                        {
                            this.state.showTrips ?
                                <Trips trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus}/> : null
                        }
                        {
                            this.state.showPacking ?
                                <Flights/> : null
                        }
                        <section className="chat">
                            <span>chat</span>
                        </section>
                    </div>
                </div>
                
            </div>
        )
    }
}