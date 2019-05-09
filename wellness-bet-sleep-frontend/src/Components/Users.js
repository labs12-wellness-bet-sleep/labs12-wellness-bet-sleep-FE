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


    async componentDidMount() {
        const endpoint =  `${process.env.REACT_APP_API_URL}/api/users`;
        console.log(endpoint, "endpoint")
        try {
            const response = await axios.get(endpoint);
            console.log(response)
            this.setState({users: response.data})
        }catch(err){
            console.log('we ran into an error getting the users')
        }
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
                return <User user={user}/>
            })}
            </div>

        )
    }
}

export default Users;
