import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Detail extends Component{
    constructor() {
        super()
        this.state = {
            currentTrip: null,
            currentTripIndex: null,
            hotel: '',
            departure_date: '',
            return_date: '',
            budget: 0,
            edit: false,
            cantGoBackToNoTrip: false
        }
    }

    componentDidMount(){
        if(this.props.tripIndex !== null) {
            this.handleChange('currentTrip', this.props.tripIndex)
        }

    }

    handleChange(tracker, value) {
        switch (tracker) {
            case 'currentTrip':
                let tripValue = this.props.trips[value]
                console.log(tripValue)
                this.setState({
                    currentTrip: tripValue,
                    currentTripIndex: value, 
                    hotel: tripValue.hotel,
                    departure_date: tripValue.departure_date,
                    return_date: tripValue.return_date,
                    budget: tripValue.budget,
                    cantGoBackToNoTrip: true
                }, () => console.log(this.state))
                break
            case 'hotel':
                this.setState({
                    hotel: value
                })
                break
            case 'departure_date':
                this.setState({
                    departure_date: value
                })
                break
            case 'return_date':
                this.setState({
                    return_date: value
                })
                break
            case 'budget':
                this.setState({
                    budget: value
                })
                break
            case 'edit':
                this.setState({
                    edit: !this.state.edit
                })
            default:
                break
        }
    }

    updateTripInfo(index) {
        let {hotel, departure_date, return_date, budget} = this.state
        let trip = Object.assign({}, this.state.currentTrip, {hotel, departure_date, return_date, budget})
        console.log(trip)
        
        this.props.updateTrip(trip, index)
        this.handleChange('edit', null)
    }

    deleteCurrentTrip(index) {
        this.props.deleteTrip(index)
        this.props.changeView('Trips')
    }

    toggleCurrentTrip(index, goAgain){
        this.props.toggleTripStatus(index, goAgain)
        this.props.changeView('Trips')
    }

    render(){
        return(
            <div id="Detail">
                 <select onChange={e => this.handleChange('currentTrip', e.target.value)} defaultValue={this.props.tripIndex}>
                    <option value={null} disabled={this.state.cantGoBackToNoTrip}>Choose a Trip...</option>
                    {
                        this.props.trips &&

                        this.props.trips.map((e, i) => {
                            return <option key={i} value={i}>{e.departure_port} ⟶ {e.destination_port}</option>
                        })
                        
                    }
                </select> 
                {
                    this.state.currentTrip ?

                    this.state.currentTrip.completed ?

                    //If trip is done, display without edit capabilities
                    <div className="tripDisplay completed">
                        <div>
                            <span>Depart</span><span className="wasInputSpan">{this.state.departure_date}</span>
                        </div>
                        <div >
                            <span>Return</span><span className="wasInputSpan">{this.state.return_date}</span>
                        </div>
                        <div>
                            <span>Budget</span><span className="wasInputSpan">${this.state.budget}</span>
                        </div>
                        <div>
                            <span>Hotel</span><span className="wasInputSpan">{this.state.hotel}</span>
                        </div>
                        <div className="buttonWrapper">
                            <button onClick={() => this.deleteCurrentTrip(this.state.currentTripIndex)}>Delete</button>
                            <button onClick={() => this.toggleCurrentTrip(this.state.currentTripIndex, true)} className="againButton">I want to go again!</button>                                
                        </div>
                    </div>
                    :
                    //Otherwise, allow editing of planning.
                    <div className="tripDisplay">
                        <div>
                            <span>Depart</span><input value={this.state.departure_date} placeholder="MM/DD/YY" onChange={e => this.handleChange('departure_date', e.target.value)} disabled={!this.state.edit}/>
                        </div>
                        <div >
                            <span>Return</span><input value={this.state.return_date} placeholder="MM/DD/YY" onChange={e => this.handleChange('return_date', e.target.value)} disabled={!this.state.edit}/>
                        </div>
                        <div>
                            <span>Budget</span><span className="budgetInputWrapper">$<input value={this.state.budget} placeholder="0.00" onChange={e => this.handleChange('budget', e.target.value)} disabled={!this.state.edit} className="budgetInput"/></span>
                        </div>
                        <div>
                            <span>Hotel</span><input value={this.state.hotel} placeholder="Hotel" onChange={e => this.handleChange('hotel', e.target.value)} disabled={!this.state.edit}/>
                        </div>
                        {
                            this.state.edit ?
                            <div className="buttonWrapper">
                                <button onClick={() => this.updateTripInfo(this.state.currentTripIndex)}>Save</button>
                                <button onClick={() => this.toggleCurrentTrip(this.state.currentTripIndex, false)}>Complete</button>                                
                                <button onClick={() => this.deleteCurrentTrip(this.state.currentTripIndex)}>Delete</button>
                            </div>
                            :
                            <div className="buttonWrapper">
                                <button onClick={() => this.handleChange('edit', null)}>Edit</button>
                                <button onClick={() => this.toggleCurrentTrip(this.state.currentTripIndex, false)}>Complete</button>
                                <button onClick={() => this.deleteCurrentTrip(this.state.currentTripIndex)}>Delete</button>
                            </div>
                            
                        }
                        <p>
                            Find <a className="flightsA" href={`https://www.skyscanner.com/transport/flights/${this.state.currentTrip.departure_port_code}/${this.state.currentTrip.destination_port_code}/`} target="_blank">flights</a>, <a className="hotelsA" href={`https://www.skyscanner.com/hotels/${this.state.currentTrip.destination_hotel_code}/`} target="_blank">hotels</a> with Skyscanner.                           
                        </p>
                    </div>

                    :

                    null

                }
                
            </div>
        )
    }
}