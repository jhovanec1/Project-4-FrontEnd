import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './UserAccount.css'

export default class UserAccount extends Component{
    constructor(){
        super()
    }

render(){
    console.log(this.props.user.user.name)
    return(
        <div>
        <div>
            <h1>ACCOUNT</h1>
            <form onSubmit={(e)=> this.props.updateUser(e)}>
            NAME: <input type="text" name="name" placeholder={this.props.user.user.name} /><br/>
            USERNAME: <input type="text" name="username" placeholder={this.props.user.user.username} /><br/>
            
            <input type="submit" value="Update Account" />
            </form>
        </div>
        <div>
            
        </div>
        </div>
    )
}
}