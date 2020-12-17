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
import UserAccount from './UserAccount';
import CarrierOrders from './CarrierOrders';
const backendUrl = 
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api';

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
      zipcode: 0,
      userorders:'',
      restaurantarry:'',
      carrierid: 0,
      carrierinfo: '',
      carrierloggedin: false,
      carrierorders:''


    }
    // this.baseState = this.state
    this.logout = this.logout.bind(this);
    this.trydocumenu = this.trydocumenu.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount = ()=>{
    this.getLocation();
    console.log(this.state.restaurantlist)
    // this.trydocumenu();
  };
//  getRestaurantList = async ()=> {
//    console.log(this.state.latitude)
//    console.log(this.state.longitude)
//    let response = await axios.get(
//     `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=5500&type=restaurant&key=AIzaSyD_Nu881UFYUOgGaLliEQ8VpeYTw1LB1CE`
//    )
//    console.log(response)
//    this.setState({restaurantlist: response.data.results})
//    console.log(this.state.restaurantlist)
//  }
 trydocumenu = async ()=>{
   console.log(this.state.zipcode)
   let res = ''
  const options = {
    method: 'GET',
    url: `https://documenu.p.rapidapi.com/restaurants/zip_code/${this.state.zipcode}`,
    params: {size: '30', fullmenu: 'true', top_cuisines: 'true', page: '1'},
    headers: {
      'x-api-key': 'ab1514d61b203d8917678cc66a9aa6c5',
      'x-rapidapi-key': '5178deb9e5mshbd2528dbbc0e1bfp1ea1fbjsn0bf90fd05f8a',
      'x-rapidapi-host': 'documenu.p.rapidapi.com'
    }
  };
  await axios.request(options).then(function (response) {
    // console.log(response.data);
    res = response.data
  }).catch(function (error) {
    console.error(error);
  });
  
  this.setState({restaurantlist: res.data})
  console.log(this.state.restaurantlist)
 }
 getRestaurant = async (e)=>{
  let response = await axios.get(
      `${backendUrl}/restaurants/`
  )
  this.setState({restaurantarry: response.data.users})

 }
 
 getLocation = async ()=>{
   let response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=25b4efee1bfe40a28d0e03652fded5dd')
   console.log(response)
   this.setState({latitude: response.data.latitude})
   this.setState({longitude: response.data.longitude})
   this.setState({zipcode: response.data.zipcode})
   this.trydocumenu();
   
 }
 getProfile = async ()=>{
  
   let response = await axios.get(
     `${backendUrl}/users/profile/${this.state.userid}`
   )
   console.log(response.data)
   this.setState({userinfo: response.data})
   this.setState({loggedIn : true})
   console.log(this.state.userinfo)
   this.getOrders();
   
 }
 createUser = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `${backendUrl}/auth/signup/user`,
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
  getOrders = async ()=>{
    let response = await axios.get(
      `${backendUrl}/order/${this.state.userid}`
    )
    console.log(response.data.orders)
    this.setState({userorders: response.data.orders})
    this.getRestaurant();
  }
  getCarrierOrders = async ()=>{
    let response = await axios.get(
      `${backendUrl}/order/carrier/${this.state.carrierid}`
    )
    this.setState({carrierorders: response.data.orders})
    console.log(response.data.orders)
    this.getRestaurant();
    
  }
  loginUser = async (e)=>{
    e.preventDefault();
    let response = await axios.post(
      `${backendUrl}/auth/login`,
      {
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
    this.setState({userid: response.data.info})
    
    this.getProfile();
    
  }
  getCarrierProfile = async ()=>{
  
    let response = await axios.get(
      `${backendUrl}/carriers/profile/${this.state.carrierid}`
    )
    console.log(response.data)
    this.setState({carrierinfo: response.data})
    this.setState({carrierloggedin: true})
    this.getCarrierOrders();
  }
  loginCarrier = async (e)=>{
    e.preventDefault();
    let response = await axios.post(
      `${backendUrl}/auth/login/carrier`,
      {
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
    this.setState({carrierid: response.data.info})
    this.getCarrierProfile();
    console.log('logged in')
    
  }
  createCarrier = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `${backendUrl}/auth/signup/carrier`,
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
      `${backendUrl}/auth/signup/restaurant`,
      {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value
      }
    );
  }
  completeOrder = async(e)=>{
    // let response = await axios.put(

    // )
    console.log(e)
  }
  logout(){
    this.setState({loggedIn: false})
    this.setState({carrierloggedin: false})
    console.log(this.state)
  }
  updateUser = async (e)=>{
    e.preventDefault();
    let response = await axios.put(
      `${backendUrl}/users/${this.state.userid}`,
      {
        name: e.target.name.value,
        username: e.target.username.value,
        // password: e.target.password.value
      }
    )
    // console.log(response)
  }
  render(){
  if(this.state.loggedIn != true && this.state.carrierloggedin != true){
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
        <CarrierLogin {...routerProps} createCarrier={(e) => this.createCarrier(e)}
        loginCarrier={(e)=>this.loginCarrier(e)}/>)}/>
      <Route path = '/api/auth/signup/restaurant' component={(routerProps)=> (
        <RestaurantLogin {...routerProps} createRestaurant={(e) => this.createRestaurant(e)} />)}/>
      </Switch>
      </main>
    </div>
  );
      }
  else if(this.state.loggedIn == true)
  {
    return(
      <div className='App'>
        <h1>DelivApp</h1>
        <header className="App-header">
          <h1>Welcome back, {this.state.userinfo.user.name}. What do you have a taste for?</h1>
          <nav>
          <Link to='/api/auth/signup/user/account' className='li'>MY ACCOUNT</Link>
          <Link to='/api/auth/signup/user/orders'onClick={this.getOrders}className='li'>MY ORDERS</Link>
          <Link to= '/api/auth/signup/user' className='li'>ORDER NOW</Link>

          <Link to='/'onClick={this.logout} className='li'>LOGOUT</Link>
        </nav>
        </header>
        <main>
          <Switch>
            <Route path='/api/auth/signup/user/orders' component={(routerProps)=>(
              <MyOrders {...routerProps} orders={this.state.userorders} restaurants = {this.state.restaurantarry}/>
            )}/>
            <Route path='/api/auth/signup/user/account' component={(routerProps)=>(
              <UserAccount {...routerProps} user={this.state.userinfo} updateUser={(e)=>this.updateUser(e)}/>
            )}/>
            <Route path='/api/auth/signup/user' component={(routerProps)=>(
              <RestaurantList {...routerProps} restaurantlist={this.state.restaurantlist} userid={this.state.userid}/>)}/>
            
          </Switch>
        </main>
        
      </div>
    )
  }else{
    console.log(this.state.carrierinfo.carrier.username)
    return(
      <div className='App'>
        <h1>DelivApp</h1>
        <header className="App-header">
          <h1>Welcome back, {this.state.carrierinfo.carrier.username}. Want to make money?</h1>
          <nav>
          <Link to='/api/auth/signup/carrier/account' className='li'>MY ACCOUNT</Link>
          <Link to='/api/auth/signup/carrier/orders'onClick={this.getCarrierOrders}className='li'>MY ORDERS</Link>
          
          <Link to='/'onClick={this.logout} className='li'>LOGOUT</Link>
        </nav>
        </header>
        <main>
        <Route path='/api/auth/signup/carrier/orders' component={(routerProps)=>(
              <CarrierOrders {...routerProps} completeOrder = {(e)=>this.completeOrder(e)} orders={this.state.carrierorders} restaurants = {this.state.restaurantarry}/>
            )}/>
        </main>
        
      </div>
    )
  }
}
}

export default App;
