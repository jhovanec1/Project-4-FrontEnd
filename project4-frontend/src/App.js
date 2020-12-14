import logo from './logo.svg';
import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import './App.css';
import UserLogin from './UserLogin';
import CarrierLogin from './CarrierLogin';
import RestaurantLogin from './RestaurantLogin';
import MyOrders from './MyOrders';
import axios from "axios";
import RestaurantList from './RestaurantList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userid: 0,
      userinfo: '',
      loggedIn: false,
      zomatokey: '23b2ca9ccd8bf6aeb3e62dec2f4d6019',
      restaurantlist: '',
      distance: 2000,
      latitude: '',
      longitude: '',


    }
    // this.baseState = this.state
    this.logout = this.logout.bind(this);
  }
  componentDidMount = ()=>{
    this.getLocation();
  };
 getRestaurantList = async ()=> {
   console.log(this.state.latitude)
   console.log(this.state.longitude)
   let response = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=5500&type=restaurant&key=AIzaSyD_Nu881UFYUOgGaLliEQ8VpeYTw1LB1CE`
   )
   console.log(response)
   this.setState({restaurantlist: response.data.results})
   console.log(this.state.restaurantlist)
 }
 getLocation = async ()=>{
   let response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=25b4efee1bfe40a28d0e03652fded5dd')
   
  //  console.log(response.data.latitude)
  //  console.log(response.data.longitude)
   this.setState({latitude: response.data.latitude})
   this.setState({longitude: response.data.longitude})
   this.getRestaurantList();
   
 }
 getProfile = async ()=>{
  
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
    // if(response == ''){
    //   console.log('no')
    // }
    this.setState({userid: response.data.info})
    
    this.getProfile();
    
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
  logout(){
    this.setState({loggedIn: false})
    console.log(this.state)
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
          <Link to='/api/auth/signup/user/orders'onClick={console.log('orders')}className='li'>MY ORDERS</Link>
          <Link to= '/api/auth/signup/user' className='li'>ORDER NOW</Link>

          <Link to='/'onClick={this.logout} className='li'>LOGOUT</Link>
        </nav>
        </header>
        <main>
          <Switch>
            <Route path='/api/auth/signup/user/orders' component={MyOrders}/>
            <Route path='/api/auth/signup/user' component={(routerProps)=>(
              <RestaurantList {...routerProps} restaurantlist={this.state.restaurantlist}/>)}/>
          
          </Switch>
        </main>
        
      </div>
    )
  }
}
}

export default App;
