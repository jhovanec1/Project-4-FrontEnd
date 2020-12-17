import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantDetail.css'
import RestaurantMenu from './RestaurantMenu'
import Cart from './Cart'
import Axios from 'axios'

export default class RestaurantDetail extends Component{
    constructor(){
        super()
        this.state ={
            isClicked: false,
            menu: '',
            cart: [],
            restaurant: '',
            orderCompleted: false,
            restaurants: ''
        }
        this.getList = this.getList.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
addOrder = async ()=>{
    // let response = await Axios.get(
    //     'http://localhost:3001/api/restaurants/'
    // )
    // console.log(response.data.users)
    let restarray = this.state.restaurants
    let userid = this.props.userid
    this.state.cart.map(async(line)=>{
        let restaurantid = 0;
        // console.log(line)
        let restinfo = restarray.find((b) => { return b.name == line.resname;})
        console.log(typeof line.price)
        let price = parseInt(line.price)
        let newresponse =  await Axios.post(
            'http://localhost:3001/api/order',
            {
                userId: userid,
                restaurantId: restinfo.id,
                carrierId: 4,
                item: line.name,
                price: price,
                isDelivered: false
                

            }
        )
        console.log(newresponse)
    })
    this.setState({orderCompleted: true})
    // this.setState({cart: []})
    
    console.log('completed')
}
// postOrder(line,restinfo){
//     console.log(line)
//     console.log(restinfo)
// }
getList(i){
    this.setState({isClicked:false})
    this.setState({isClicked: true})
    let list = this.props.restaurant.menus[0].menu_sections[i.target.id].menu_items
    this.setState({menu: list})
}
addToCart(i){
    let item = this.state.menu[i.target.id]
    
    item.resname = this.props.restaurant.restaurant_name
    // console.log(item)
    let cart = this.state.cart
    let newCart = cart.push(item)
    // console.log(cart)
    this.setState({cart: cart})
    this.checkRestaurant();
   

}
addNewRestaurant = async (e)=>{
    let response = await Axios.post(
        'http://localhost:3001/api/restaurants/',
        {
            name: this.props.restaurant.restaurant_name,
            username: this.props.restaurant.restaurant_name,
            password: this.props.restaurant.restaurant_name,
            account: 0,
            address: this.props.restaurant.address.formatted
        }
    )
    console.log('Restaurant added')
}
checkRestaurant = async (e)=>{
    // e.preventDefault();
    let response = await Axios.get(
        'http://localhost:3001/api/restaurants/'
    )
    
    let reslist = response.data.users
    this.setState({restaurants: reslist})
    let name = this.props.restaurant.restaurant_name
    const favoriteBook = reslist.find((b) => { return b.name == name;});
    if(typeof favoriteBook === 'undefined'){
        this.addNewRestaurant();
    }else{
        console.log('restaurant there')
    }
}
render(){
    let menus = this.props.restaurant.menus[0].menu_sections
    const menuList = menus.map((menu, index)=>{
    return(
        
            <a onClick = {this.getList} id ={index}>{menu.section_name}</a>
        
    )
    })
    
    return(
        <div>
        <div className='menulist'>
            {menuList}
        </div>
        <div className='menu'>
            <RestaurantMenu isClicked={this.state.isClicked} menu = {this.state.menu} addToCart={this.addToCart} addRestaurant={this.addRestaurant} orderCompleted={this.state.orderCompleted}/>
        </div>
        <div className='cart'>
            <h1>CART</h1>
            <Cart cart={this.state.cart} restaurant={this.props.restaurant} checkout={this.addOrder}/>
        </div>
        </div>
        
        
        
    )
    
}
}