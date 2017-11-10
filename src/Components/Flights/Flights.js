import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import plane from '../../images/plane.png';
import plane_path from '../../images/plane_path.png';
import $ from 'jquery';
import TweenMax from 'gsap';

export default class Flights extends Component{

    constructor() {
        super();
        this.state = {
            destination_port: '',
            departure_port: '',
            destination_port_code: '',
            departure_port_code: ''
        }
    }

    componentDidMount(){
                     
    }


    handleChange(tracker, value){
        switch (tracker){
            case 'destination':
                this.setState({
                    destination_port: value
                });
                break;
            case 'departure':
                this.setState({
                    departure_port: value
                });
                break;
            default:
                break;
        }
            
    }

    getCodes(){
        let {destination_port, departure_port} = this.state;
        axios.post(`http://localhost:3001/api/departurePortCodes`, {departure_port}).then(res => {
            console.log(res.data);
            this.setState({
                departure_port_code: res.data.value
            })
        })
        axios.post(`http://localhost:3001/api/destinationPortCodes`, {destination_port}).then(res => {
            console.log(res.data);
            this.setState({
                destination_port_code: res.data.value
            })
        })
    }

    showCities(){
        // TweenMax.to($('#plane'), 1.5, { opacity: '1', delay: 0, ease: TweenMax.Power4.easeInOut } )
        TweenMax.to($('#cityOne'), 1.5, { opacity: '1', delay: 0.25, ease: TweenMax.Power4.easeInOut } )
        // TweenMax.to($('#plane'), 3, { top: '105px', left: '220px', delay: 0, ease: TweenMax.Power4.easeInOut} )
        TweenMax.to($('#plane'), 3, { opacity: '0', delay: 2.5, ease: TweenMax.Power4.easeInOut } ) 
        // TweenMax.to($('.animateContainer a'), 3, { width: '300px', delay: 0.25, ease: TweenMax.Power4.easeInOut })
        TweenMax.to($('#cityTwo'), 1.5, { opacity: '1', delay: 1, ease: TweenMax.Power4.easeInOut } )  
        
    }

    render(){
        let goodToGo = this.state.departure_port.length > 0 && this.state.destination_port.length > 0;
        return(
            <ul id="Flights">
                <div className="flightForm">
                    <div className="searchWrapper">
                        <div>
                            <input placeholder="From..." value={this.state.departure_port} onChange={e => this.handleChange('departure', e.target.value)}/>
                            <input placeholder="To..." value={this.state.destination_port} onChange={e => this.handleChange('destination', e.target.value)}/>
                        </div>
                        {
                            <div>
                                <button onClick={() => {this.getCodes(); this.showCities()}} disabled={!goodToGo} style={{color: goodToGo ? 'black' : 'rgba(255, 255,255, 0.0)'}}>Search Flights</button>
                                <button disabled={!goodToGo} style={{color: goodToGo ? 'black' : 'rgba(255, 255,255, 0.0)'}}>Create Trip</button>
                            </div>
                        }  
                    </div>
                    <div className="animateContainer">
                        <p id="cityOne">{this.state.departure_port.toUpperCase()}</p>
                        <p id="cityTwo">{this.state.destination_port.toUpperCase()}</p>
                        <a href={`https://www.skyscanner.com/transport/flights/${this.state.departure_port_code}/${this.state.destination_port_code}/`} target="_blank">Find With Skyscanner</a>
                        <img id="plane" src={plane} style={{width: '50px', height: '50px'}}/>
                        
                    </div>                 
                </div>
                {/* https://www.skyscanner.com/transport/flights/slc/lax/ */}
                {/* https://www.skyscanner.com/transport/flights/slc/lax/171108/171109/airfares-from-salt-lake-city-to-los-angeles-international-in-november-2017.html?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home#results */}
            </ul>
        )
    }
}