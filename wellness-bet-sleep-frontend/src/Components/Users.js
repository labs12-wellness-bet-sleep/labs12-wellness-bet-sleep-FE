import React, { Component } from 'react';
import { auth } from '../FirebaseConfig';
import { connect } from 'react-redux';
// import actions from './../Store/Actions';

import { getProfile } from './../Store/Actions/auth';
import User from "./User.js";
import axios from "../axios-sleep";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        // console.log(this.props.users[0], 'users')
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
}

const mapStateToProps = state => {
    console.log(state, "state")
    return {
        users: state.user,
        
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         getUsers: user => dispatch(actions.auth.initOAuth(user)),
//         profilePage: () =>  dispatch(getProfile(user))
//     }
// }

export default connect(mapStateToProps, {})(Users);
