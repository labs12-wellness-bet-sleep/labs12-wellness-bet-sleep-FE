import React, { Component } from 'react';
import { Route, Link, NavLink } from "react-router-dom";
import { auth } from './FirebaseConfig';

import './App.css';

import Home from "./Components/Home.js";
import Login from "./Components/LogIn.js";
import Register from "./Components/Register.js";
import Users from "./Components/Users.js";
import SendEmail from './Components/Email/SendEmail.js';
import GroupPage from './Components/group/GroupPage';

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
      <NavLink to="/" >Home </NavLink>
      <Link to="/users"> List of Users </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register</Link>
      <Link to="/email"> Send Invite</Link>
      </nav>
    
      <Route path='/' exact component={Home}/> 
      <Route path='/users' exact component={Users}/> 
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/email' component={SendEmail}/>

      {this.state.users ? (<Users/>) : (<Login/>)}
      <GroupPage />
    </div>
  )
}
}

export default App;
