import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantList.css'

export default class RestaurantList extends Component{
    constructor(){
        super()
    }

render(){
    const restaurantList = this.props.restaurantlist.map((restaurant)=>{
        return(
        <div className='list'>
        
            <h1 className='restaurant'>{restaurant.name}</h1>
            <p className='address'>{restaurant.vicinity}</p>
            <button><span>ORDER</span>
            </button>
        
        </div>
        )
    })
    // console.log(this.props)
    return(
        <div>
            <h1>Your Local Restaurants:</h1>
            <div className='reslist'>
                {restaurantList}
            </div>
        </div>
    )
}
}