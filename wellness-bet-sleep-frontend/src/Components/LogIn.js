import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            loggedIn: false, 
            loginMessage: "Please log in."
        }
    }

    componentDidMount(){
        if(this.state.loggedIn == false){
            this.setState({loginMessage: "Please log in."})
        }
    }


    handleChanges = e => {

        e.preventDefault();
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    login = e => {

        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.post("https://sleep-bet.herokuapp.com/auth/login", user)
            .then(result => { 
                this.setState({loggedIn: true, loginMessage: result.data.message })
                console.log("Congratulations on logging on!");
                return console.log(result)})
            .catch(error => console.log(error));

        this.props.history.push("/users");
    }

    render() {

        return(

        <div ClassName="login">

           <div className="login-message">
            {this.state.loginMessage}
            </div>

        <h2>Login</h2>

        <form onSubmit={this.login}>

            <b>Name:</b>
            <input name="username" type="text" onChange={(e) => this.handleChanges(e)}></input>

            <b>Password:</b>
            <input name="password" type="password" onChange={(e) => this.handleChanges(e)}></input>
            
            <button type="submit">Submit</button>

        </form>
        
        </div>
        )
    }

}

export default Login;