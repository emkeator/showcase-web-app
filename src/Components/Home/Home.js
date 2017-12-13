import React, {Component} from 'react'
import Header from '../Header/Header'
import Trips from '../Trips/Trips'
import Flights from '../Flights/Flights'
import Detail from '../Detail/Detail'
import Chat from '../Chat/Chat'
import TweenMax from 'gsap'
import $ from 'jquery'
import axios from 'axios'
import plane from '../../images/plane.png'

export default class Home extends Component{
    constructor() {
        super()
        this.state = {
            showFlights: false,
            showTrips: true,
            showPacking: false,
            showChat: false,
            selectedTrip: null,
            user: null
        }

        this.changeView = this.changeView.bind(this)
    }

    componentDidMount(){
        //check if user on session - if yes, change state.userOnSession to true
        axios.get('/auth/me')
        .then(res => {
            console.log(res.data)
            if(res.data === 'User not found'){
                window.location = '/'
            } else {
                this.setState({
                    user: res.data
                })
            }
        })
        .catch(err => {
            console.log(err)
            window.location = '/'
        })
    }

    changeView(tracker, value = null){
        switch (tracker) {
            case 'Flights':
                this.setState({
                    showFlights: true,
                    showTrips: false,
                    showPacking: false
                })
                if(this.state.showChat){
                    this.changeView('chat')
                }
                break
            case 'Trips':
                this.setState({
                    showFlights: false,
                    showTrips: true,
                    showPacking: false
                })
                if(this.state.showChat){
                    this.changeView('chat')
                }
                break
            case 'Packing':
                this.setState({
                    showFlights: false,
                    showTrips: false,
                    showPacking: true
                })
                console.log(this.state.showChat)
                if(this.state.showChat){
                    this.changeView('chat')
                }
                break
            case 'selectedTrip':
                this.setState({
                    selectedTrip: value,
                    showFlights: false,
                    showTrips: false,
                    showPacking: true
                })
            case 'chat':
                if (!this.state.showChat) {
                    TweenMax.to($('#Chat'), 1.5, {height: '480px', ease: TweenMax.Power4.easeInOut})
                    TweenMax.to($('.modules'), 0, {opacity: '0', delay: 0, ease: TweenMax.Power4.easeInOut})
                } else {
                    TweenMax.to($('#Chat'), 1.5, {height: '30px', ease: TweenMax.Power4.easeInOut})
                    TweenMax.to($('.modules'), 0, {opacity: '1', delay: 1, ease: TweenMax.Power4.easeInOut})
                }
                this.setState({
                    showChat: !this.state.showChat
                })
            default:
                break
        }
    }


    render(){
        return(
            <div id="Home">
                
                <Header firstname={"Emily"}/>
                <div className="homeWrapper">
                    <div className="mobileMakingWrapper">
                        <section className="choices">
                            <span className="spanChoice" onClick={() => this.changeView('Flights')}>Explore</span>
                            <span className="spanChoice" onClick={() => this.changeView('Trips')}>Trips</span>
                            <span className="spanChoice" onClick={() => this.changeView('Packing')}>info</span>
                        </section>
                        <section className="modules">
                            {
                                this.state.showFlights && !this.state.showChat ?
                                    <Flights createTrip={this.props.createTrip} changeView={this.changeView}/> : null
                            }
                            {
                                this.state.showTrips && !this.state.showChat ?
                                    <Trips trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus} changeView={this.changeView}/> : null
                            }
                            {
                                this.state.showPacking && !this.state.showChat?
                                    <Detail trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus} updateTrip={this.props.updateTrip} changeView={this.changeView} deleteTrip={this.props.deleteTrip} tripIndex={this.state.selectedTrip}/> : null
                            }
                        </section>
                        
                        <Chat changeView={this.changeView} showChat={this.state.showChat}/>
                    </div>
                </div>

            </div>
        )
    }
}