import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import sky_word_logo from '../../images/skyscannerWordLogo.png';
import sky_logo from '../../images/skyscannerLogo2.png';
import $ from 'jquery';
import TweenMax from 'gsap';

export default class Flights extends Component{

    constructor() {
        super();
        this.state = {
            destination_port: '',
            departure_port: '',
            destination_port_code: '',
            departure_port_code: '',
            destination_hotel_code: ''
        }
    }


    handleChange(tracker, value){
        if (value === '') {
            TweenMax.to($('.flightsA'), 0, { left: '-90px', delay: 0, ease: TweenMax.Power4.easeInOut } )  
            TweenMax.to($('.hotelsA'), 0, {left: '-90px', delay: 0, ease: TweenMax.Power4.easeInOut } )  
            TweenMax.to($('#aWrapper img'), 0, {left: '300px', delay: 0, ease: TweenMax.Power4.easeInOut } )
        }
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
        axios.post(`/api/departurePortCodes`, {departure_port}).then(res => {
            console.log(res.data);
            if (res.data.length === 0) {
                alert(`Departure city ${departure_port} is not valid! Try again.`)
            } else {
                this.setState({
                    departure_port_code: res.data[0].value
                })
            }
            
        }).catch(err => {
            alert(`Something's up! ${err.response.statusText} ${err.response.status}. The API key may have expired - message me to fix it. In the meantime, you can still make trips, but not link to Skyscanner to find hotels or flights.`)
        })
        
        axios.post(`/api/destinationPortCodes`, {destination_port}).then(res => {
            console.log(res.data);
            let hotelVal;
            if (res.data.length === 0) {
                alert(`Destination city ${destination_port} is not valid! Try again.`)
            } else {
                if (res.data.length > 1) {
                    hotelVal = res.data[1].value
                } else {
                    hotelVal = res.data[0].value
                }
                this.setState({
                    destination_port_code: res.data[0].value,
                    destination_hotel_code: hotelVal
                })
            }
            
        }).catch(err => {
            alert(`Something's up! ${err.response.statusText} ${err.response.status}. The API key may have expired - message me to fix it. In the meantime, you can still make trips, but not link to Skyscanner to find hotels or flights.`)
        })
    }

    showCities(){
        TweenMax.to($('.flightsA'), 1.5, { left: '60px', delay: 1.5, ease: TweenMax.Power4.easeInOut } )  
        TweenMax.to($('.hotelsA'), 1.5, {left: '150px', delay: 1.5, ease: TweenMax.Power4.easeInOut } )  
        TweenMax.to($('#aWrapper img'), 1.5, {left: '103px', delay: 1.5, ease: TweenMax.Power4.easeInOut } )  
    }

    makeTrip(){
        let {departure_port, destination_port, departure_port_code, destination_port_code, destination_hotel_code} = this.state
        let completed = 0,
            departure_date = '',
            return_date = '',
            hotel = '',
            budget = ''
        this.props.createTrip({
            departure_port,
            destination_port,
            departure_port_code,
            destination_port_code,
            destination_hotel_code,
            completed,
            departure_date,
            return_date,
            hotel,
            budget
        })
        this.props.changeView('Trips')
    }

    render(){
        let goodToGo = this.state.departure_port.length > 0 && this.state.destination_port.length > 0;
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
                            <button onClick={() => this.makeTrip()} disabled={!goodToGo} style={{color: goodToGo ? 'black' : 'rgba(255, 255,255, 0.0)'}}>Create Trip</button>
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