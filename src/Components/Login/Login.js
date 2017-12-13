import React, {Component} from 'react';
import TypeAnimate from '../TypeAnimate/TypeAnimate';

export default class Login extends Component{
    render(){
        return(
            <div id="Login">
                <div className="mobileMakingWrapper">
                    <TypeAnimate/>
                    <a href="http://localhost:3003/auth">
                        <p>LOGIN</p>
                        <p className="secondary">Or Sign Up</p>
                    </a>
                </div>
            </div>
        )
    }
}