import React, { Component } from 'react';
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
        axios.get("https://sleep-bet.herokuapp.com/api/users")
            .then(result => {
                this.setState({users: result.data})
            })
            .catch(error => console.log(error));
    }

    render() {
        return(
            <div className="Users">
            <h2>List Of Users:</h2>
            {this.state.users.map(user => {
                return <User user={user}/>
            })}
            </div>

        )
    }
}

export default Users;