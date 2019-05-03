import React, { Component } from 'react';
import { Link } from'react-router-dom';
import axios from 'axios';
import { auth, googleProvider } from '../../FirebaseConfig';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 30%;
    /* border: 1px solid red; */
    
`;

const LoginTitle = styled.div`
    color: white;
    font-size: 2rem;
    
    /* border: 1px solid orange; */
    span {
        padding-top: 4rem;
    }
`;
const LoginFormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: space-around;
    /* border: 3px solid green; */
`;

const LoginFormInput = styled.input`
    border: none;
    border-radius: 2rem;
    background-color: #abb5c488;
    margin-top: 2rem;
    height: 55px;
    width: 95%;
    ::placeholder {
        color: white;
        padding-left: 1rem;
        font-size: 1rem;
    }
`;
const LoginFormButtons = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    margin-top: 2rem;
    align-items: center;
    /* height: 300px; */
    /* border: 1px solid orange; */
`;
const LoginFormLinks = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    /* border: 1px solid red; */
    .register-link {
        color: #585a5e;
        text-decoration: none;
    }
`;

const LoginFormButton = styled.button`
    border: none;
    background-color: none; 
    border: none;
    border-radius: 2rem;
    background-color: #004CA8;
    color: white;
    font-size: 1rem;
    height: 55px;
    width: 100%;
`;
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

    loginWithGoogle = event => {
        event.preventDefault()
        auth.signInWithPopup(googleProvider)
        .then(user => {
            console.log(user, 'google signin')
        })
        .catch(err => console.error(err));
    }
    
    render() {

        return(

        <LoginWrapper>

           {/* <div className="login-message">
            {this.state.loginMessage}
            </div> */}
        <LoginTitle>
            {/* <h3>Wellness Bet</h3>  <h2>Sleep</h2> */}
            Wellness Bet <br/>  <span> Sleep</span>
        </LoginTitle>
        {/* <h2>Login</h2> */}

        <LoginFormWrapper>
                <LoginFormInput
                    name="email" 
                    placeholder='Email'
                    type="email" 
                    id='email' 
                    onChange={(e) => this.handleChanges(e)}/>
          
                <LoginFormInput 
                    name="password" 
                    placeholder='Password'
                    type="password" 
                    id='password' 
                    onChange={(e) => this.handleChanges(e)
                }/>
            
            <LoginFormButtons>
                <LoginFormButton onClick={this.loginWithEmail}>Get Started</LoginFormButton> 
                {/* <LoginFormButton onClick={this.loginWithEmail}>Login</LoginFormButton> 
                <LoginFormButton onClick={this.signUp}>Sign Up</LoginFormButton> */}
                
                {/* <LoginFormButton onClick={this.loginWithGoogle}>SignUp with Google</LoginFormButton> */}
            </LoginFormButtons>
        </LoginFormWrapper>
        <LoginFormLinks>
            <Link to="/register" className='register-link'>Create Account</Link>
            <div onClick={this.loginWithGoogle}><Link className='register-link'>Login With Google</Link></div>
        </LoginFormLinks>
        
        </LoginWrapper>
        )
    }

}

export default Login;
