import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { auth } from './FirebaseConfig';

import './App.css';

import Home from "./Components/Home.js";
import Login from "./Components/LogIn.js";
import Register from "./Components/Register.js";
import Users from "./Components/Users.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    }
  }

  // componentDidMount = () => {
  
  // }

  // authListener = () => {
  //   auth().onAuthStateChanged((user) => {
  //     console.log(user)
  //   })
  // }

  render () {
  return (
    <div className="App">

      <nav>
      <Link to="/" activeClassName="selected" >Home </Link>
      <Link to="/users"> List of Users </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register</Link>
      </nav>
    
      <Route path={'/'} component={Home}/> 
      <Route path={'/users'} component={Users}/> 
      <Route path={'/login'} component={Login}/>
      <Route path={'/register'} component={Register}/>
    </div>
  )
}
}

export default App;
