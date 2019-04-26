import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {

        super(props);

    this.state = {
        username: "",
        email: "",
        password: ""
    }

    }

    componentDidMount(){

    }

    handleChanges = e => {
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    register() {
        
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.post("https://sleep-bet.herokuapp.com/register", user)
            .then(result => {
                
                console.log("Congratulations on registering!");
                console.log(result)})
            .catch(error => console.log(error));
    }

    render() {

        return(
            <div ClassName="register">

            <h2>Register</h2>

            <form onSubmit={this.register}>
                <b>Name:</b>
                <input name="username" type="text" onChange={() => this.handleChanges}></input>

                <b>Email:</b>
                <input name="email" type="text" onChange={() => this.handleChanges}></input>

                <b>Password:</b>
                <input name="password" type="password" onChange={() => this.handleChanges}></input>
                
                <button type="submit">Submit</button>
            </form>

            </div>
        )
    }

}

export default Register; 