import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { auth } from './FirebaseConfig';

import './App.css';

import Home from './Components/home/Home';
import Login from "./Components/login/LogIn";
import Register from "./Components/Register.js";
import Users from "./Components/Users.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    }
  }

  componentDidMount = () => {
    this.authListener()
  }

  authListener = () => {
    auth.onAuthStateChanged((users) => {
      console.log(users, 'in auth listener')
      if(users) {
        this.setState({
          users
        })
      } else {
        this.setState({
          users: null
        })
      }
    })
  }

  render () {
  return (
    <div className="App">

      <nav>
      <Link to="/" activeClassName="selected" >Home </Link>
      <Link to="/users"> List of Users </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register</Link>
      </nav>
    
      <Route exact path={'/'} component={Home}/> 
      <Route exact path={'/users'} component={Users}/> 
      <Route exact path={'/login'} component={Login}/>
      <Route exact path={'/register'} component={Register}/>
      
      {/* {this.state.users ? (<Users/>) : (<Login/>)} */}
    </div>
  )
}
}

export default App;
