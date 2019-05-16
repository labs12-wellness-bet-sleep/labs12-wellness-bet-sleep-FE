import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import actions from "./Store/Actions";
import { auth } from "./FirebaseConfig";

import "./App.css";


import Dashboard from "./Components/dashboard/Dashboard";
import NavBar from "./Components/dashboard/NavBar"
import JoinWithCode from "./Components/dashboard/JoinWithCode";
import CreateForm from "./Components/dashboard/CreateForm";
import Profile from "./Components/profile/Profile";
import Home from "./Components/home/Home";

import Login from "./Components/login/LogIn";
import Register from "./Components/register/Register";
import Users from "./Components/Users.js";
import GroupDashboard from "./Components/GroupDashboard/GroupDashboard.js";
import SendEmail from "./Components/Email/SendEmail.js";
import GroupPage from "./Components/group/GroupPage";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     users: {}
  //   }
  // }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      console.log(user, "in auth listener");
      if (user) {
        const { uid, ra } = user;
        if (user.email) {
          const { email } = user;
          this.props.oAuth({ id: uid, email, token: ra });
        }
      }
      // else {
      //   this.setState({
      //     users: null
      //   })
      // }
    });
  };

  render() {
    console.log(this.props.users);
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
        <Route exact path="/login" render={props => <Login {...props} />} />
        {/* <Route exact path={'/'} component={Home}/>  */}
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route exact path={"/users"} render={props => <Users {...props} />} />
        {/* <Route exact path='/login'/> */}
        {/* <Route exact path={'/login'} component={Login}/> */}
      
        <Route exact path="/groups" component={GroupPage} />
        <Route exact path="/email" component={SendEmail} />

        {/* {this.state.users ? (<Users/>) : (<Login/>)} */}

        <Route path={"/groupDashboard"} component={GroupDashboard} />
        {/* <Route path="/dashboard" render={props => <Dashboard {...props} />} /> */}
        <Route
          exact
          path="/login/:id"
          render={props => (
            <Profile
              {...props}
              // users={this.props.users}
            />
          )}
        />
        <Route exact path={'/register'} component={Register}/>
        <Route exact path='/email' component={SendEmail}/>

      {/* <Route exact path={'/'} component={Home}/> 
      <Route exact path ='/' render={props => <Home {...props} /> } />
      <Route exact path={'/users'} render={ props => <Users {...props}/>}/> 
      {/* <Route exact path='/login'/> */}
      {/* <Route exact path={'/login'} component={Login}/> */}
      {/* <Route exact path={'/register'} component={Register}/>
      <Route exact path='/groups' component={GroupPage}/>
      <Route exact path='/email' component={SendEmail}/> */}
      
      {/* {this.state.users ? (<Users/>) : (<Login/>)} */}

      {/* <Route path={'/groupDashboard'} component={GroupDashboard}/> */}

  

<Route
       exact path="/user/:id"
       render={(props)=>(
        <Dashboard
        {...props}
        // users={this.props.users}
         />
      )}
      />
      {/* <Route path="/dashboard/join" component={JoinWithCode}/>
      <Route path="/dashboard/create" component={CreateForm} /> */}
    </div>
  )
}

}

const mapStateToProps = state => {
  return {
    users: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    oAuth: user => dispatch(actions.auth.initOAuth(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);