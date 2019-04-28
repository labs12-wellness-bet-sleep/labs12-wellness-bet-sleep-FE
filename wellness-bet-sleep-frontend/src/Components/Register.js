import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {

        super(props);

    this.state = {
        username: "",
        email: "",
        password: "",
        registered: false,
        welcomeMessage: "Please register before logging in."
    }

    }

    componentDidMount(){
        if(this.state.registered == false){
            this.setState({welcomeMessage: "Please register before logging in."})
        }
    }

    handleChanges = e => {
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    register = e => {

        e.preventDefault();
        
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }

        axios.post("https://sleep-bet.herokuapp.com/auth/register", user)
            .then(result => {
                console.log(result);
                this.setState({registered: true, welcomeMessage: `Congratulations for registering, ${result.data.username}`})
                console.log("Congratulations on registering!");
                console.log(result)})
            .catch(error => console.log(error));

            this.props.history.push("/users");
    }

    render() {

        return(
            <div ClassName="register">

            <h2>Register</h2>

            <div className="registerMessage">
            {this.state.welcomeMessage}
            </div>

            <form onSubmit={this.register}>
                <b>Name:</b>
                <input name="username" type="text" onChange={(e) => this.handleChanges(e)}></input>

                <b>Email:</b>
                <input name="email" type="text" onChange={(e) => this.handleChanges(e)}></input>

                <b>Password:</b>
                <input name="password" type="password" onChange={(e) => this.handleChanges(e)}></input>
                
                <button type="submit">Submit</button>
            </form>

            </div>
        )
        
    }

}

export default Register; 