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
            edit: false
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
                    budget: tripValue.budget
                })
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

    toggleCurrentTrip(index){

    }

    render(){
        return(
            <div id="Detail">
                <select onChange={e => this.handleChange('currentTrip', e.target.value)} defaultValue={'none'}>
                    <option value={'none'}>Choose a Trip...</option>
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

                    <div className="tripDisplay completed">
                        <h1>{this.state.currentTrip.departure_port} ⟶ {this.state.currentTrip.destination_port}</h1>
                        <h2>
                            {this.state.currentTrip.departure_date} - {this.state.currentTrip.return_date}
                        </h2>
                        <p>{this.state.currentTrip.budget}</p>
                        <p>{this.state.currentTrip.hotel}</p>
                        <div className="buttonWrapper">
                            <button onClick={() => this.deleteCurrentTrip(this.state.currentTripIndex)}>Delete</button>
                        </div>
                    </div>
                    :
                    <div className="tripDisplay">
                        <h1>{this.state.currentTrip.departure_port} ⟶ {this.state.currentTrip.destination_port}</h1>
                        <h2>
                            <input value={this.state.departure_date} placeholder="MM/DD/YY" onChange={e => this.handleChange('departure_date', e.target.value)} disabled={!this.state.edit}/> - 
                            <input value={this.state.return_date} placeholder="MM/DD/YY" onChange={e => this.handleChange('return_date', e.target.value)} disabled={!this.state.edit}/>
                        </h2>
                        <input value={this.state.budget} placeholder="0.00" onChange={e => this.handleChange('budget', e.target.value)} disabled={!this.state.edit}/>
                        <input value={this.state.hotel} placeholder="Hotel" onChange={e => this.handleChange('hotel', e.target.value)} disabled={!this.state.edit}/>
                        {
                            this.state.edit ?
                            <div className="buttonWrapper">
                                <button onClick={() => this.updateTripInfo(this.state.currentTripIndex)}>Save</button>
                                <button onClick={() => this.deleteCurrentTrip(this.state.currentTripIndex)}>Delete</button>
                            </div>
                            :
                            <div className="buttonWrapper">
                                <button onClick={() => this.handleChange('edit', null)}>Edit</button>
                                <button >Complete</button>
                            </div>
                            
                        }
                        {/* <img src={`https://source.unsplash.com/1600x900/?${this.state.currentTrip.destination_port.split(' ').join(',')}`} style={{width: '200px', height: '100px'}}/> */}
                        
                        
                    </div>

                    :

                    null

                }
                
            </div>
        )
    }
}