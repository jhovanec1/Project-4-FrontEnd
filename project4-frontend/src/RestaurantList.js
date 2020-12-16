import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantList.css'
import RestaurantDetail from './RestaurantDetail'

export default class RestaurantList extends Component{
    constructor(){
        super()
        this.state = {
            isclicked : false,
            restaurant: '',
            restaurantdeats: ''
        }
        this.showDetails = this.showDetails.bind(this);
        // this.findDetails = this.findDetails.bind(this);
    }
showDetails(i){
    this.setState({isclicked: true})
    this.setState({restaurant: i.target.attributes[0].value})
    let info = this.props.restaurantlist[i.target.id]
    // console.log(info)
    this.setState({restaurantdeats: info})
    
}

render(){
    const restaurantList = this.props.restaurantlist.map((restaurant, index)=>{
        return(
        <div className='list'>
        
            <h1 className='restaurant'>{restaurant.restaurant_name}</h1>
            <p className='address'>{restaurant.address.formatted}</p>
            <p className='phone'>{restaurant.restaurant_phone}</p>
            <button value={restaurant.restaurant_name} id={index} onClick={this.showDetails}>ORDER
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
                <div>
                    <RestaurantDetail restaurant= {this.state.restaurantdeats} userid = {this.props.userid}/>
                </div>
            </div>
        </div>
        )
    }
}
}