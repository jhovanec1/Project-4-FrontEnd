import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantList.css'

export default class RestaurantList extends Component{
    constructor(){
        super()
        this.state = {
            isclicked : false,
            restaurant: ''
        }
        this.showDetails = this.showDetails.bind(this);
    }
showDetails(i){
    this.setState({isclicked: true})
    console.log(i.target.attributes[0].value)
    this.setState({restaurant: i.target.attributes[0].value})
    // this.setState({restaurant: restaurant.name})
}
render(){
    const restaurantList = this.props.restaurantlist.map((restaurant)=>{
        return(
        <div className='list'>
        
            <h1 className='restaurant'>{restaurant.restaurant_name}</h1>
            <p className='address'>{restaurant.address.formatted}</p>
            <button value={restaurant.restaurant_name} onClick={this.showDetails}>ORDER
            </button>
        
        </div>
        )
    })
   
    if(this.state.isclicked == false){
    return(
        <div>
            <h1>Your Local Restaurants:</h1>
            <div className='reslist'>
                {restaurantList}
            </div>
        </div>
    )
    }else{
        return(
        <div className='detailview'>
            <h1>Your Local Restaurants:</h1>
            <div className='reslist1'>
                {restaurantList}
            </div>
            <div className='resdetails'>
                <h1>{this.state.restaurant}</h1>
                <nav>

                </nav>
            </div>
        </div>
        )
    }
}
}