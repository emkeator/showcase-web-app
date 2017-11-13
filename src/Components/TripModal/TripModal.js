import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import TweenMax from 'gsap';

export default class Flights extends Component{

    constructor() {
        super();
        this.state = {
            
        }
    }


    render(){
        return(
            <div id="Flights">
                <div className="flightForm">
                    <div className="searchWrapper">
                        <div>
                            <input placeholder="From..." value={this.state.departure_port} onChange={e => this.handleChange('departure', e.target.value)}/>
                            <input placeholder="To..." value={this.state.destination_port} onChange={e => this.handleChange('destination', e.target.value)}/>
                        </div>
                        
                        <div>
                            <button onClick={() => {this.getCodes(); this.showCities()}} disabled={!goodToGo}>
                                <img src={sky_word_logo} alt="skyscanner - click to search" style={{opacity: goodToGo ? '1' : '0'}}/>
                            </button>
                            <button disabled={!goodToGo} style={{color: goodToGo ? 'black' : 'rgba(255, 255,255, 0.0)'}}>Create Trip</button>
                        </div>
                    </div>
                    <div className="animateContainer">
                        <div id="aWrapper">
                            <img src={sky_logo} alt="skyscanner logo"/>
                            <div>
                                <a className="flightsA" href={`https://www.skyscanner.com/transport/flights/${this.state.departure_port_code}/${this.state.destination_port_code}/`} target="_blank">Flights</a>                            
                                <a className="hotelsA" href={`https://www.skyscanner.com/hotels/${this.state.destination_hotel_code}/`} target="_blank">Hotels</a>                            
                            </div>
                        </div>
                        
                    </div>                 
                </div>

                
            </div>
        )
    }
}