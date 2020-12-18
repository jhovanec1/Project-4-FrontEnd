import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './CarrierLogin.css'

export default class CarrierLogin extends Component{
    constructor(){
        super()
    }

render(){
    return(
        <div>
        <div>
            <h2>Carrier Signup</h2>
            <form onSubmit={(e) => this.props.createCarrier(e)}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="SIGN UP" />
            </form>
        </div>
        <div>
            <h2>Carrier Login</h2>
            <form onSubmit={(e) => this.props.loginCarrier(e)}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="LOGIN" />
            </form>

        </div>
        </div>
    )
}
}