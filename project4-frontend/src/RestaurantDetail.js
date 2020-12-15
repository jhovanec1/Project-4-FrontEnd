import { render } from '@testing-library/react'
import React, { Component } from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import './RestaurantDetail.css'
import RestaurantMenu from './RestaurantMenu'

export default class RestaurantDetail extends Component{
    constructor(){
        super()
        this.state ={
            isClicked: false,
            menu: ''
        }
        this.getList = this.getList.bind(this);
    }
getList(i){
    // console.log(i.target.id)
    this.setState({isClicked:false})
    this.setState({isClicked: true})
    let list = this.props.restaurant.menus[0].menu_sections[i.target.id].menu_items
    // console.log(list)
    this.setState({menu: list})
}
render(){
    // console.log(this.props.restaurant.menus)
    let menus = this.props.restaurant.menus[0].menu_sections
    // console.log(menus)
    const menuList = menus.map((menu, index)=>{
    return(
        
            <a onClick = {this.getList} id ={index}>{menu.section_name}</a>
        
    )
    })
    // if(this.state.isClicked == true){
    // const menu = this.state.menu.map((item)=>{
    //     return(
    //         <a>{item}</a>
    //     )
    // })
    // }else{
    
    //     return <a>{this.state.menu}</a>
    // }
    return(
        <div>
        <div className='menulist'>
            {menuList}
        </div>
        <div>
            <RestaurantMenu isClicked={this.state.isClicked} menu = {this.state.menu}/>
        </div>
        </div>
        //  <div className='menu'>
        //     {menu}
        // </div> 
        
        
    )
    
}
}