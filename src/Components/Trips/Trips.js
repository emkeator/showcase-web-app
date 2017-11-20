import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Trips extends Component{

    toggleTrip(index, target){
        let node = ReactDOM.findDOMNode(this.refs[target])
        node.classList.toggle('completed')
        this.props.toggleTripStatus(index, false);
    }


    render(){
        return(
            <ul id="Trips">
                {/* onClick={() => this.toggleTrip(i, `${i}${e.departure_port}`)}>
                                {e.departure_port} ⟶ {e.destination_port} */}
                {this.props.trips ?

                    this.props.trips.map((e, i) => {
                    return <li className={e.completed ? "completed" : ''} 
                               key={`${i}${e.departure_port}`}
                               ref={`${i}${e.departure_port}`}
                               onClick={() => this.props.changeView('selectedTrip', i)}>
                               {e.departure_port} ⟶ {e.destination_port}
                            </li>
                    })

                    :

                    <li>Choose the Explore tab to add a trip!</li>
                }
            </ul>
        )
    }
}