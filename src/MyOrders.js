import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './MyOrders.css'

export default class MyOrders extends Component{
    constructor(){
        super()
    }

render(){
    // console.log(this.props.orders)
    let reverse = this.props.orders.reverse();
    // console.log(reverse)
    let orderlist = reverse.map((order, index)=>{
        let date = order.createdAt.substring(0,10)
        let time = order.createdAt.substring(19,14)
        // console.log(time)
        const favoriteBook = this.props.restaurants.find((b) => { return b.id == order.restaurantId;});
        // console.log(favoriteBook)
        let hour = (parseFloat(order.createdAt.substring(19,11)))-6
        if(hour<0){
            hour = (24 + parseFloat(order.createdAt.substring(19,11))) -6 
        }else{
            hour = hour
        }
        
        let minute = parseFloat(order.createdAt.substring(19,14),10)
        let seconds = parseFloat(order.createdAt.substring(19,17))
        let ampm = ''
        let delivery = ''
        if(minute.length<2){
            minute = '0'+ minute
        }else{
            minute = minute
        }
        if(hour<12){
            ampm = 'AM'
        }else{
            ampm = 'PM'
        }
        if(order.isDelivered == false){
            delivery = 'Order is on the Way'
        }else{
            delivery = 'Completed'
        }
        
        // console.log(time);
        return(
            <div className='orderdiv'>
                <h1>{favoriteBook.name}</h1>
                <p>{order.item}</p>
                <p>${order.price}</p>
                <p>{hour}:{minute}.{seconds}{ampm} {date}</p>
                <p>{delivery}</p>
            </div>
        )
    })
    return(
        <div className='orderlist'>
            <h1>ORDERS</h1>
            {orderlist}
        </div>
    )
}
}