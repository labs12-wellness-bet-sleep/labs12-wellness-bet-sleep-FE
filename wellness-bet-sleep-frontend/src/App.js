import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import actions from './Store/Actions';
import { auth } from './FirebaseConfig';

import './App.css';


import Dashboard from "./Components/dashboard/Dashboard";
import NavBar from "./Components/dashboard/NavBar"
import JoinWithCode from "./Components/dashboard/JoinWithCode";
import CreateForm from "./Components/dashboard/CreateForm";
import Home from "./Components/home/Home";


import Login from "./Components/login/LogIn";
import Register from './Components/register/Register';
import Users from "./Components/Users.js";
import Profile from './Components/profile/Profile'
import GroupDashboard from "./Components/GroupDashboard/GroupDashboard.js";
import TestUserDashboard from "./Components/GroupDashboard/TestUserDashboard.js";
import GoogleFitAuthenticationPage from "./Components/GoogleFitAuthentication/GoogleFitAuthenticationPage.js";
import VenmoUpload from './Components/dashboard/VenmoUpload';

import SendEmail from './Components/Email/SendEmail.js';
import GroupPage from './Components/group/GroupPage';


class App extends Component {

  componentDidMount = () => {

    auth.onAuthStateChanged((user) => {
      console.log(user, 'in auth listener')
      if (user) {
        const { uid, ra, email } = user;
        localStorage.setItem('token', ra)
        if (user.email) {
          const { email } = user;
          this.props.oAuth({ firebase_id: uid, email, token: ra })
        }

        // this.props.emailLogin(user)
      }
      else {
        this.setState({
          users: null
        })
      }
    })

  }


  logout = () => {
    // localStorage.removeItem('token');
    auth.signOut()
    this.props.history.push('/')
    console.log('log out')
  }
  render() {
    // console.log( this.props.users)
    return (
      <div className="App">
        <NavLink to="/groups"> Group Page </NavLink>
        <NavLink to="/email"> Email </NavLink>
        <Route
          exact path='/login'
          render={props =>
            <Login
              {...props}
            />
          }
        />

    
        <Route exact path='/' render={props => <Home {...props} />} />
        <Route exact path={'/users'} render={props => <Users {...props} />} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path='/groups' component={GroupPage} />
        <Route exact path='/email' component={SendEmail} />
        <Route path={'/groupDashboard'} component={GroupDashboard} />


     
      


        {/* <Route exact path={'/'} component={Home}/> 
      <Route exact path ='/' render={props => <Home {...props} /> } />
      <Route exact path={'/users'} render={ props => <Users {...props}/>}/> 
      {/* <Route exact path='/login'/> */}
        {/* <Route exact path={'/login'} component={Login}/> */}
        {/* <Route exact path={'/register'} component={Register}/>
      <Route exact path='/groups' component={GroupPage}/>
      <Route exact path='/email' component={SendEmail}/>
      
      {/* {this.state.users ? (<Users/>) : (<Login/>)} */}

      <Route path={'/groupDashboard'} component={GroupDashboard}/>
      <Route
       path="/dashboard"
       render={(props)=>(
        <Dashboard
        {...props}
         />
      )}
      />
       <Route
       exact path="/login/:id"
       render={(props)=>(
        <Profile
        {...props}
        // users={this.props.users}
         />
      )}
      />
      <Route path="/dashboard/join" component={JoinWithCode}/>
      <Route path="/dashboard/create" component={CreateForm} />
      <Route path="/dashboard/GoogleFitAuthentication" render={props => <GoogleFitAuthenticationPage {...props}/>} />
      <Route path="/dashboard/TestUserDashboard" render={props => <TestUserDashboard {...props}/>}/>
      <Route path="/user/venmoUpload" component={VenmoUpload} />
     

        <Route
          path="/user"
          render={(props) => (
            <Dashboard
              {...props}
              logout={this.logout}
            />
          )}
        />


    </div>
  )
}
}

const mapStateToProps = state => {
  console.log('appjs', state)
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    oAuth: user => dispatch(actions.auth.initOAuth(user)),
    emailLogin: (user) => dispatch(actions.auth.login(user)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);