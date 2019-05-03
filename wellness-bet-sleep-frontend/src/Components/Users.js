import React, { Component } from 'react';
import { auth } from '../FirebaseConfig';
import User from "./User.js";
import axios from 'axios';


class Users extends Component {
    constructor(props) {
    super(props);

    this.state = {
        users: []
    }

    }

    componentDidMount(){
        axios.get("http://localhost:8080/api/users")
            .then(result => {
                this.setState({users: result.data})
            })
            .catch(error => console.log(error));
    }

    logout = () => {
        auth.signOut()
    }
    render() {
        return(
            <div className="Users">
            <button onClick={this.logout}>Logout</button>
            <h2>List Of Users:</h2>
            {this.state.users.map(user => {
                return <User key={user.id} user={user}/>
            })}
            </div>

        )
    }
}

export default Users;
