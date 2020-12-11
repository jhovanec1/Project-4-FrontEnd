import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'

export default class RestaurntLogin extends Component{
    constructor(){
        super()
    }

render(){
    return(
        <div>
            <h1>Restaurant Login</h1>
            <form onSubmit={(e) => this.props.createRestaurant(e)}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="SIGN UP" />
            </form>
        </div>
    )
}
}