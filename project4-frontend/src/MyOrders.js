import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'

export default class MyOrders extends Component{
    constructor(){
        super()
    }

render(){
    return(
        <div>
            <h1>ORDERS</h1>
        </div>
    )
}
}