import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { auth } from './FirebaseConfig';

import './App.css';

import Home from "./Components/Home.js";
import Login from "./Components/LogIn.js";
import Register from "./Components/Register.js";
import Users from "./Components/Users.js";
import Groups from './Components/Views/GroupsView/Groups.js';

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
    
      <Route path={'/'} component={Home}/> 
      <Route path={'/users'} component={Users}/> 
      <Route path={'/login'} component={Login}/>
      <Route path={'/register'} component={Register}/>  
      <Route path="/newusers/:id/groups" component={Groups} />    

      {this.state.users ? (<Users/>) : (<Login/>)}
    </div>
  )
}
}

export default App;
