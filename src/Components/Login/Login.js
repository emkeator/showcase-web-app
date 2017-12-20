import React, {Component} from 'react'
import TypeAnimate from '../TypeAnimate/TypeAnimate'
import axios from 'axios'

export default class Login extends Component{
    componentDidMount(){
        //check if user on session - if yes, change state.userOnSession to true
        axios.get('/auth/me/login').then(res => {
            if(res.data === 'User found') {
                window.location.href = 'http://localhost:3004/#/'
            }
        })
    }

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