import React, { Component } from 'react';
import axios from 'axios';
import { auth } from '../FirebaseConfig';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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

    loginWithEmail = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log(user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    signUp = event => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {

        return(

        <div ClassName="login">

           <div className="login-message">
            {this.state.loginMessage}
            </div>

        <h2>Login</h2>

        <form>

            <b>email:</b>
            <input name="email" type="email" onChange={(e) => this.handleChanges(e)}></input>

            <b>Password:</b>
            <input name="password" type="password" onChange={(e) => this.handleChanges(e)}></input>
            
            <button onClick={this.loginWithEmail}>Login</button> 
            <button onClick={this.signUp}>Sign Up</button>

        </form>
        
        </div>
        )
    }

}

export default Login;
