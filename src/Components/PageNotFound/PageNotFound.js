import React, {Component} from 'react'
import Header from '../Header/Header'


export default class PageNotFound extends Component{

    render(){
        return(
            <div id="PageNotFound">
                <p>{this.props.displayString}</p>
                <img src={'https://d30y9cdsu7xlg0.cloudfront.net/png/14383-200.png'}/>
            </div>
        )
    }
}