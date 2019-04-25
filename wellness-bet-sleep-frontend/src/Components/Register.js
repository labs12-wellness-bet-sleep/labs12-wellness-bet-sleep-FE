import React, { Component } from 'react';

class Register extends Compoent {
    constructor(props) {

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
        this.setState({[e.target.name]: e.target.value});
    }

    register() {
        
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.post("https://sleep-bet.herokuapp.com/register", user)
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    render() {

        return(
            <div ClassName="register">

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