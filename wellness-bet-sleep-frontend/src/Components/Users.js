<<<<<<< HEAD
import React, { Component } from 'react';
import { auth } from '../FirebaseConfig';
import { connect } from 'react-redux';
import actions from './../Store/Actions';
=======
import React, { Component } from "react";
import { auth } from "../FirebaseConfig";
>>>>>>> 9d55577319eec988f8b7022b3d1b4240a3cea933
import User from "./User.js";
import axios from "../axios-sleep";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
        users: []
    }

    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        console.log('User token:', token);
        this.props.getUsers(token)
        // axios.get("/api/users", {headers: {"authorization":token}})
        //     .then(result => {
        //         this.setState({users: result.data})
                
        //     })
        //     .catch(error => console.log(error));
    }

    logout = () => {
        // localStorage.removeItem('token');
        auth.signOut()
        this.props.history.push('/')
        console.log('log out')
    }
    render() {
        console.log(this.props.users, 'users')
        return(
            <div className="Users">
            <button onClick={this.logout}>Logout</button>

            
            <h2>List Of Users:</h2>
            { Object.keys(this.props.users).map(key  =>{ return (
                <User history={this.props} user={this.props.users[key] }/>
            )})}
            </div>

        )
    }
=======
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log("User token:", token);
    axios
      .get("/api/users", { headers: { authorization: token } })
      .then(result => {
        this.setState({ users: result.data });
      })
      .catch(error => console.log(error));
  }

  logout = () => {
    localStorage.removeItem("token");
    auth.signOut();
    this.props.history.push("/");
    console.log("log out");
  };
  render() {
    console.log(this.state.users);
    return (
      <div className="Users">
        <button onClick={this.logout}>Logout</button>

        <h2>List Of Users:</h2>
        {!!this.state.users[0] &&
          this.state.users.map(user => {
            return <User user={user} />;
          })}
      </div>
    );
  }
>>>>>>> 9d55577319eec988f8b7022b3d1b4240a3cea933
}

const mapStateToProps = state => {
    return {
        users: state.auth.user,
        
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getUsers: user => dispatch(actions.auth.initOAuth(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
