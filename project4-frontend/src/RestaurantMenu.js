import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'

export default class RestaurantMenu extends Component{
    constructor(){
        super()
    }

render(){
    console.log(this.props.isClicked)
    console.log(this.props.menu)
    if(this.props.isClicked == false){
    return(
        <div>
            <h1>MENU</h1>
        </div>
    )
    }else{
        const menu = this.props.menu.map((item)=>{
            return(
                <div>
                    <a>{item.name}</a>
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