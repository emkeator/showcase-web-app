import React from 'react';
import TypeAnimate from '../TypeAnimate/TypeAnimate';

export default function Header(props){
    return(
        <div id="Header">
            <div className="mobileMakingWrapper">
                <h1>Welcome, {props.firstname}</h1>
                {/* <TypeAnimate/>  */}
            </div>
        </div>
    )
}