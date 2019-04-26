import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
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

    login() {

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.get("https://sleep-bet.herokuapp.com/login", user)
            .then(result => { 
                console.log("Congratulations on logging on!");
                return console.log(result)})
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