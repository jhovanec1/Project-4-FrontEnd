import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantMenu.css'

export default class RestaurantMenu extends Component{
    constructor(){
        super()
    }

render(){
    console.log(this.props.isClicked)
    // console.log(this.props.menu)
    if(this.props.isClicked == false){
    return(
        <div>
            <h1>CLICK ON A MENU SECTION</h1>
        </div>
    )
    }else{
        const menu = this.props.menu.map((item, index)=>{
            return(
                <div className='menuitem'>
                    <h1>{item.name}</h1><br/>
                    <a>${item.price}</a><br/>
                    <a>{item.description}</a><br/>
                    
                    <button onClick={this.props.addToCart} id={index}>ADD TO CART</button>
                </div>
            )
        })
        return(
            <div>
                {menu}
            </div>
        )
    }
}
}