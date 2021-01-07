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
            restaurantdeats: '',
            buttoncolor: 'black',
            clicks: 0
        }
        this.showDetails = this.showDetails.bind(this);
        this.addclick = this.addclick.bind(this)
        // this.findDetails = this.findDetails.bind(this);
    }
showDetails(i){
    this.setState({isclicked: true})
    this.setState({restaurant: i.target.attributes[0].value})
    let info = this.props.restaurantlist[i.target.id]
    // console.log(info)
    this.setState({restaurantdeats: info})
    console.log(i)
    this.setState({buttoncolor: 'grey'})
    this.setState({clicks: 0})
    
}
addclick(){
    let cur = this.state.clicks;
    let newnum = cur + 1
    this.setState({clicks: newnum})
}
render(){
    const restaurantList = this.props.restaurantlist.map((restaurant, index)=>{
        return(
        <ul className='list'>
        
            <h1 className='restaurant'>{restaurant.restaurant_name}</h1>
            {/* <p className='address'>{restaurant.address.formatted}</p> */}
            <p className='phone'>{restaurant.restaurant_phone}</p>
            <button value={restaurant.restaurant_name} id={index} onClick={this.showDetails}>SEE MENU
            </button>
        
        </ul>
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
                
                <div>
                {/* <h1>{this.state.restaurant}</h1> */}
                    <RestaurantDetail restaurant= {this.state.restaurantdeats} userid = {this.props.userid}
                    getOrders = {this.props.getOrders} isclicked={this.state.isclicked} addclick={this.addclick}
                    clicks={this.state.clicks}/>
                </div>
            </div>
        </div>
        )
    }
}
}