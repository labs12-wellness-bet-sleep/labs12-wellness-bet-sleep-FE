import React, { Component } from 'react';

class Login extends Compoent {
    constructor(props) {
        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount(){
        
    }


    handleChanges = e => {

        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    login() {

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.post("https://sleep-bet.herokuapp.com/login", user)
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    render() {

        return(

        <div ClassName="login">

        <h2>Login</h2>

        <form onSubmit={this.login}>

            <b>Name:</b>
            <input name="username" type="text" onChange={() => this.handleChanges}></input>

            <b>Email:</b>
            <input name="email" type="text" onChange={() => this.handleChanges}></input>
            
            <button type="submit">Submit</button>

        </form>
        
        </div>
        )
    }

}

export default Login;