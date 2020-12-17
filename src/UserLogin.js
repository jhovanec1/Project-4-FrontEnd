import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'

export default class UserLogin extends Component{
    constructor(){
        super()
    }

render(){
    return(
        <div>
            <h1>New? Sign Up</h1>
            <form onSubmit={(e) => this.props.createUser(e)}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="SIGN UP" />
            </form>
            
            <br/>

            <h1>Been here before? Log In</h1>
            <form onSubmit={(e) => this.props.loginUser(e)}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="LOG IN" />
            </form>
        </div>
    )
}
}