import React, {Component} from 'react'
import Header from '../Header/Header'
import Trips from '../Trips/Trips'
import Flights from '../Flights/Flights'
import Detail from '../Detail/Detail'

export default class Home extends Component{
    constructor() {
        super()
        this.state = {
            showFlights: false,
            showTrips: false,
            showPacking: true
        }

        this.changeView = this.changeView.bind(this)
    }

    changeView(tracker){
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
                            <span onClick={() => this.changeView('Flights')}>Explore</span>
                            <span onClick={() => this.changeView('Trips')}>Trips</span>
                            <span onClick={() => this.changeView('Packing')}>info</span>
                        </section>
                        {
                            this.state.showFlights ?
                                <Flights createTrip={this.props.createTrip} changeView={this.changeView}/> : null
                        }
                        {
                            this.state.showTrips ?
                                <Trips trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus}/> : null
                        }
                        {
                            this.state.showPacking ?
                                <Detail trips={this.props.trips} toggleTripStatus={this.props.toggleTripStatus} updateTrip={this.props.updateTrip} changeView={this.changeView} deleteTrip={this.props.deleteTrip}/> : null
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