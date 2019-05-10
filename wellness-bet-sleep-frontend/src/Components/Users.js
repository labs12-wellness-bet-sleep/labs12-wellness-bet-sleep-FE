import React, { Component } from 'react';
import { auth } from '../FirebaseConfig';
import User from "./User.js";
import axios from '../axios-sleep';


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
        axios.get("/api/users", {headers: {"authorization":token}})
            .then(result => {
                this.setState({users: result.data})
            })
            .catch(error => console.log(error));
    }

    logout = () => {
        localStorage.removeItem('token');
        auth.signOut()
        this.props.history.push('/')
        console.log('log out')
    }
    render() {
        console.log(this.state.users)
        return(
            <div className="Users">
            <button onClick={this.logout}>Logout</button>

            
            <h2>List Of Users:</h2>
            {!!this.state.users[0] && this.state.users.map(user =>{ return (
                <User user={user}/>
            )})}
            </div>

        )
    }
}

export default Users;
