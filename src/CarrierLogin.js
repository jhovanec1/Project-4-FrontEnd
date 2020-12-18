import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './CarrierLogin.css'

export default class CarrierLogin extends Component{
    constructor(){
        super()
    }

render(){
    const loading = ()=>{
        if(this.props.status == 'loading'){
            return <p className="loading">Loading</p>
        }
    
    }
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
        <br/>
        <div>
                {loading()}
                {/* <p className="loading">Loading</p> */}
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