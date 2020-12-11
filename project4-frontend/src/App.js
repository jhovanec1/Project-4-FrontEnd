import logo from './logo.svg';
import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import './App.css';
import UserLogin from './UserLogin';
import CarrierLogin from './CarrierLogin';
import RestaurantLogin from './RestaurantLogin';
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      userid: 0,
      userinfo: '',
      loggedIn: false,
      key: '23b2ca9ccd8bf6aeb3e62dec2f4d6019'

    }
  }
 getProfile = async ()=>{
  //  e.preventDefault();
   let response = await axios.get(
     `http://localhost:3001/api/users/profile/${this.state.userid}`
   )
   console.log(response.data)
   this.setState({userinfo: response.data})
   this.setState({loggedIn : true})
   
 }
 createUser = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `http://localhost:3001/api/auth/signup/user`,
      {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
    // console.log(response.data.info)
    this.setState({userid: response.data.info})
    this.getProfile();
  }
  loginUser = async (e)=>{
    e.preventDefault();
    let response = await axios.post(
      `http://localhost:3001/api/auth/login`,
      {
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
    console.log(response.data.info)
    if(response == ''){
      console.log('no')
    }
    this.setState({userid: response.data.info})
    
    this.getProfile();
    // if response comes back not error, send username to new function which does get request for profile
    // save profile in the state/cookie so that it is held. Then render local restaurant list page
  }
  createCarrier = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `http://localhost:3001/api/auth/signup/carrier`,
      {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
  }
  createRestaurant = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `http://localhost:3001/api/auth/signup/restaurant`,
      {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
  }
  render(){
  if(this.state.loggedIn != true){
  return (
    <div className="App">
      <h1>DelivApp</h1>
      <header className="App-header">
        <nav>
          <Link to='/api/auth/signup/user'className='li'>ORDER FOOD</Link>
          <Link to='/api/auth/signup/carrier' className='li'>DELIVER FOOD</Link>
          <Link to='/api/auth/signup/restaurant' className='li'>MAKE FOOD</Link>
        </nav>
      </header>
      <main>
        <Switch>
      <Route path = '/api/auth/signup/user' component={(routerProps)=> (
        <UserLogin {...routerProps} createUser={(e) => this.createUser(e)}
        loginUser={(e)=> this.loginUser(e)}/>)}/>
      <Route path = '/api/auth/signup/carrier' component={(routerProps)=> (
        <CarrierLogin {...routerProps} createCarrier={(e) => this.createCarrier(e)}/>)}/>
      <Route path = '/api/auth/signup/restaurant' component={(routerProps)=> (
        <RestaurantLogin {...routerProps} createRestaurant={(e) => this.createRestaurant(e)}/>)}/>
      </Switch>
      </main>
    </div>
  );
      }
  else{
    return(
      <div className='App'>
        <h1>DelivApp</h1>
        <header className="App-header">
          <h1>Welcome back, {this.state.userinfo.user.name}. What do you have a taste for?</h1>
          <nav>
          <Link to='api/user/orders'className='li'>MY ORDERS</Link>
          

          <Link to='/'className='li'>LOGOUT</Link>
        </nav>
        </header>
        
      </div>
    )
  }
}
}

export default App;
