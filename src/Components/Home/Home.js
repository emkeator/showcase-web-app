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
            user: null,
            trips: []
        }

        this.changeView = this.changeView.bind(this)
        this.toggleTripStatus = this.toggleTripStatus.bind(this)
        this.createTrip = this.createTrip.bind(this)
        this.updateTrip = this.updateTrip.bind(this)
        this.deleteTrip = this.deleteTrip.bind(this)
    }

    componentDidMount(){
        //check if user on session - if yes, change state.userOnSession to true
        axios.get('/auth/me')
        .then(res => {
            if(res.data === 'User not found'){
                console.log(window.location)
                // window.location.hash = '/login'
                window.location.href = 'https://travel-showcase-app.herokuapp.com/#/login'

            } else {
                this.setState({
                    user: res.data
                })
                axios.get(`/api/getTrips/${res.data.id}`).then( trips => {
                    this.setState({
                        trips: trips.data
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            window.location = '/login'
        })
    }

    toggleTripStatus(index, goAgain){
        if (goAgain) {
            let x = this.state.trips.slice(0)
            let trip = Object.assign({}, x[index], {completed: 0, departure_date: '', return_date: ''})
            axios.post(`/api/createTrip`, {trip}).then(res => {
                console.log(res.data[0])
                x.unshift(res.data[0])
                this.setState({
                    trips: x
                })
            })
        } else {
            let x = this.state.trips.slice(0)
            x[index].completed = x[index].completed === 0 ? 1 : 0
            let tripToUpdate = x[index]
            this.setState({
                trips: x
            })
            //this will call update trip completion
            axios.get(`/api/updateTripCompletion/${tripToUpdate.id}/${tripToUpdate.completed}`).then(res => {
                if(res.status !== 200) alert('Sorry, the database is down! Try again later.')
            })
        }
        
    }

    createTrip(tripObject){
        let x = this.state.trips.slice(0)
        tripObject.user_id = this.state.user.id
        //call create trip and then assign what comes back
        axios.post(`/api/createTrip`, {trip: tripObject}).then(res => {
            x.unshift(res.data[0])
            this.setState({
                trips: x
            })
        })
    }

    updateTrip(tripObject, index){
        let x = this.state.trips.slice(0)
        x[index] = tripObject
        this.setState({
            trips: x
        })
        //call update!
        axios.put(`/api/updateTrip`, { trip: tripObject }).then(res => {
            if(res.status !== 200) alert('Sorry, the database is down! Try again later.')
        })
    }

    deleteTrip(index){
        let x = this.state.trips.slice(0)
        let tripToDelete = x.splice(index, 1)
        this.setState({
            trips: x
        })
        console.log(tripToDelete)
        axios.delete(`/api/deleteTrip/${tripToDelete[0].id}`).then(res => {
            if(res.status !== 200) alert('Sorry, the database is down! Try again later.')
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
                if(this.state.showChat){
                    this.changeView('chat')
                }
                break
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
                
                <Header firstname={this.state.user ? this.state.user.firstname : null}/>
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
                                    <Flights createTrip={this.createTrip} changeView={this.changeView}/> : null
                            }
                            {
                                this.state.showTrips && !this.state.showChat ?
                                    <Trips trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} changeView={this.changeView}/> : null
                            }
                            {
                                this.state.showPacking && !this.state.showChat?
                                    <Detail trips={this.state.trips} toggleTripStatus={this.toggleTripStatus} updateTrip={this.updateTrip} changeView={this.changeView} deleteTrip={this.deleteTrip} tripIndex={this.state.selectedTrip}/> : null
                            }
                        </section>
                        
                        <Chat changeView={this.changeView} showChat={this.state.showChat}/>
                    </div>
                </div>

            </div>
        )
    }
}