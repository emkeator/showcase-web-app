import React from 'react';
import TypeAnimate from '../TypeAnimate/TypeAnimate';

export default function Header(props){
    return(
        <div id="Header">
            <div className="mobileMakingWrapper">
                {
                    props.firstname ?

                    <h1>Welcome, {props.firstname}</h1>
                    
                    :

                    <h1>Welcome</h1>
                }
                {/* <TypeAnimate/>  */}
                <a href="http://localhost:3003/auth/logout">Logout</a> 
            </div>
        </div>
    )
}