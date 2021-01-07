import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './UserLogin.css'

export default class UserLogin extends Component{
    constructor(){
        super()
    }

render(){
    console.log(this.props.status)
    const loading = ()=>{
        if(this.props.status == 'loading'){
            return <p className="loading">Loading</p>
        }
    
    }
    return(
        <div>
            <div>
            <h1>New? Sign Up</h1>
            <form onSubmit={(e) => this.props.createUser(e)}>
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

            <h1>Been here before? Log In</h1>
            <h2>USE USERNAME: 1 AND PASSWORD: 1 TO SEE FEATURES</h2>
            <form onSubmit={(e) => this.props.loginUser(e)}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input type="submit" value="LOG IN" />
            </form>
            </div>
        </div>
    )
}
}