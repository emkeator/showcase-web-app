import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Trips extends Component{

    toggleTrip(index, target){
        let node = ReactDOM.findDOMNode(this.refs[target])
        node.classList.toggle('completed')
        this.props.toggleTripStatus(index);
    }

    render(){
        return(
            <ul id="Trips">
                {this.props.trips.map((e, i) => {
                    return <li className={e.completed ? "completed" : ''} 
                               key={`${i}${e.departure_port}`}
                               ref={`${i}${e.departure_port}`}
                               onClick={() => this.toggleTrip(i, `${i}${e.departure_port}`)}>

                                {e.departure_port} ⟶ {e.destination_port}
                                
                            </li>
                })}
            </ul>
        )
    }
}