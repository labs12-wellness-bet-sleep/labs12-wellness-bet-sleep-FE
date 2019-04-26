import React, { Component } from 'react';

class Users extends Compoent {
    constructor(props) {

    this.state = {
        users = []
    }

    }

    componentDidMount(){
        axios.post("https://sleep-bet.herokuapp.com/api/users", user)
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
                <User user={user}/>
            })}
            </div>

        )
    }
}
