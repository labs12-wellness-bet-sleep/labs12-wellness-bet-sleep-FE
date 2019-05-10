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
    // componentDidMount(){
    //     axios.get("https://localhost8080/api/users")
    //     // axios.get("https://sleep-bet.herokuapp.com/api/users")
    //         .then(result => {
    //             this.setState({users: result.data})
    //         })
    //         .catch(error => console.log(error));
    // }

    logout = () => {
        auth.signOut()
        this.props.history.push('/')
        console.log('log out')
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
