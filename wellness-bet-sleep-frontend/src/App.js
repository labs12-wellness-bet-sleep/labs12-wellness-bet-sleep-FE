import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import { auth } from './FirebaseConfig';

import './App.css';

import Home from './Components/home/Home';
import Login from "./Components/login/LogIn";
import Register from "./Components/Register.js";
import Users from "./Components/Users.js";
import GroupDashboard from "./Components/GroupDashboard/GroupDashboard.js";
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

      {/* <nav>
      <NavLink to="/" activeclass="selected" >Home </NavLink>
      <NavLink to="/users"> List of Users </NavLink>
      <NavLink to="/login"> Login </NavLink>
      <NavLink to="/register"> Register</NavLink>      
      </nav> */}
      <NavLink to="/groups"> Group Page </NavLink>
      <NavLink to="/email"> Email </NavLink>
      <Route
          exact path ='/login'
          render={props =>
            <Login
              {...props}
            />
          }
        />
      {/* <Route exact path={'/'} component={Home}/>  */}
      <Route exact path ='/' render={props => <Home {...props} /> } />
      <Route exact path={'/users'} render={ props => <Users {...props}/>}/> 
      {/* <Route exact path='/login'/> */}
      {/* <Route exact path={'/login'} component={Login}/> */}
      <Route exact path={'/register'} component={Register}/>
      <Route exact path='/groups' component={GroupPage}/>
      <Route exact path='/email' component={SendEmail}/>
      
      {/* {this.state.users ? (<Users/>) : (<Login/>)} */}

      <Route path={'/groupDashboard'} component={GroupDashboard}/>
    </div>
  )
}
}

export default App;
