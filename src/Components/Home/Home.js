import React, {Component} from 'react';
import Header from '../Header/Header';
import Trips from '../Trips/Trips';

export default class Home extends Component{
    constructor() {
        super();
        this.state = {
            showFlights: false,
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
                        <Trips trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus}/>

                        <section className="chat">
                            <span>chat</span>
                        </section>
                    </div>
                </div>
                
            </div>
        )
    }
}