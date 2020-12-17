import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './Cart.css'

export default class Cart extends Component{
    // constructor(){
    //     super()
    // }

render(){
    // console.log(this.props.cart)
    let restaurant = this.props.restaurant.restaurant_name
    const cart = this.props.cart.map((item)=>{
        return(
            <div className='cart'>
            <li>{item.resname}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            </div>
        )
    })
    return(
        <div >
            {cart}
            <button onClick={this.props.checkout}>CHECKOUT</button>
        </div>
    )
}
}