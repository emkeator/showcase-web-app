import React, {Component} from 'react'
import Header from '../Header/Header'
import Trips from '../Trips/Trips'
import Flights from '../Flights/Flights'
import Detail from '../Detail/Detail'
import Chat from '../Chat/Chat'
import TweenMax from 'gsap'
import $ from 'jquery'

export default class Home extends Component{
    constructor() {
        super()
        this.state = {
            showFlights: false,
            showTrips: true,
            showPacking: false,
            showChat: false,
            selectedTrip: null
        }

        this.changeView = this.changeView.bind(this)
    }

    changeView(tracker, value = null){
        switch (tracker) {
            case 'Flights':
                this.setState({
                    showFlights: true,
                    showTrips: false,
                    showPacking: false
                })
                break
            case 'Trips':
                this.setState({
                    showFlights: false,
                    showTrips: true,
                    showPacking: false
                })
                break
            case 'Packing':
                this.setState({
                    showFlights: false,
                    showTrips: false,
                    showPacking: true
                })
                break
            case 'selectedTrip':
                this.setState({
                    selectedTrip: value,
                    showFlights: false,
                    showTrips: false,
                    showPacking: true
                })
            case 'chat':
                if (this.state.showChat) {
                    TweenMax.to($('#Chat'), 1.5, {height: '480px', ease: TweenMax.Power4.easeInOut})
                } else {
                    TweenMax.to($('#Chat'), 1.5, {height: '30px', ease: TweenMax.Power4.easeInOut})
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
                        {
                            this.state.showFlights ?
                                <Flights createTrip={this.props.createTrip} changeView={this.changeView}/> : null
                        }
                        {
                            this.state.showTrips ?
                                <Trips trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus} changeView={this.changeView}/> : null
                        }
                        {
                            this.state.showPacking ?
                                <Detail trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus} updateTrip={this.props.updateTrip} changeView={this.changeView} deleteTrip={this.props.deleteTrip} tripIndex={this.state.selectedTrip}/> : null
                        }
                        {/* <section className="chat">
                            <span className="spanChoice">chat</span>
                        </section> */}
                        <Chat changeView={this.changeView} showChat={this.state.showChat}/>
                    </div>
                </div>
                
            </div>
        )
    }
}