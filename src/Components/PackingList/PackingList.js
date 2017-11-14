import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class PackingList extends Component{
    constructor() {
        super()
        this.state = {
            currentTrip: null,
            packing_list: [],
            hotel: '',
            departure_date: '',
            return_date: '',
            budget: 0
        }
    }

    handleChange(tracker, value) {
        switch (tracker) {
            case 'currentTrip':
                this.setState({
                    currentTrip: value
                })
                break
            case 'packing_list':
                let x = this.state.packing_list.slice()
                x.push(value)
                this.setState({
                    packing_list: x
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
            case 'currentTrip':
                this.setState({
                    budget: value
                })
                break
            default:
                break
        }
    }

    updateTripInfo(index) {
        let {packing_list, hotel, departure_date, return_date, budget} = this.state
        let trip = Object.assign({}, trip, packing_list, hotel, departure_date, return_date, budget)
        this.props.updateTrip(trip, index)
    }

    render(){
        return(
            <div id="PackingList">
                <select>
                    <option selected={true}>Choose a Trip...</option>
                    {
                        this.props.trips ? 

                        this.props.trips.map((e, i) => {
                            return <option key={i} value={e}>{e.departure_port} ⟶ {e.destination_port}</option>
                        })

                        :

                        null
                    }
                </select>
                
            </div>
        )
    }
}