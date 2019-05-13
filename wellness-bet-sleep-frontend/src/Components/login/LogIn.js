import React, { Component } from 'react';
import axios from '../../axios-sleep';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../../FirebaseConfig';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import './../../App.css';
import './login-styles.css'
import wellnessLogo from './../../assets/images/wellness-logo.png';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    input: {
      
        border: 'none',
        borderRadius: '2rem',
        backgroundColor: '#b0b4b969',
        color: 'white',
        fontSize: '1.2rem',
        // marginTop: '2rem',
        paddingLeft: '4rem',
        height: '70px',
        width: '80%',
    }, 
   
    button: {
        border: 'none',
        backgroundColor: 'none', 
        border: 'none',
        borderRadius: '2rem',
        backgroundColor:'#004CA8',
        color: 'white',
        fontSize: '1rem',
        height: '70px',
        marginTop: '2rem',
        // width: '100%',
        '&:hover': {
            backgroundColor:'#004CA8',
        }
    }
  });
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
            .then(({user}) => {
                const { uid, email, ra} = user;
                console.log(user)
                localStorage.setItem("token", ra);
                axios
                .get(`/api/users/login/${email}`, {headers: {"authorization": ra}})
                .then(result => {
                  console.log(result);
                  this.setState({
                    loggedIn: true,
                    loginMessage: `Congratulations for logging in, ${
                      result.data.username
                    }`
                  })
                
                }).catch(error => console.log(error))

            })
            .catch(
                error => {
                console.log(error)
        })
        this.props.history.push('/users')
    }

    loginWithGoogle = event => {
        event.preventDefault()
        auth.signInWithPopup(googleProvider)
        .then(({user}) => {
            console.log(user, 'google signin')
            localStorage.setItem("token", user.ra);
            axios.get(`/api/users/login/${user.email}`, {headers: {"authorization":user.ra}} ).
            then(response => {
                console.log(response);
            })
        })
        .catch(err => console.error(err))
        this.props.history.push('/users')
    }
    
    render() {
        const { classes } = this.props;  
        return(

        <div ClassName="login-wrapper">
 <header className='login-header'>
                {/* <div > */}
                <img src={wellnessLogo} alt='Wellness Logo' className='wellness-logo'/>
                {/* </div> */}
                <br />
                <span className='top'>Wellness Bet </span><br />
                <span className='bottom'>Sleep</span>
            </header>
           {/* <div className="login-message">
            {this.state.loginMessage}
            </div>

        <h2>Login</h2> */}

        <form className='login-form'>
        <FontAwesomeIcon icon={faUserCircle} size='lg' className='fa-users'/>
            <TextField
                autoFocus
                type="email"
                fullWidth
                required
                onChange={(e) => this.handleChanges(e)}
                placeholder='Email'
                InputProps={{
                    className: classes.input,
                    disableUnderline: true ,
                }}
              />

            <FontAwesomeIcon icon={faLock}  className='fa-lock'/>
            <TextField
                fullWidth
                type="password"
                required
                inputRef={this.usrPassword}
                placeholder='Password'
                InputProps={{
                    className: classes.input,
                    disableUnderline: true ,
                }}
              />
            {/* <b>email:</b> */}
            {/* <input name="email" type="email" onChange={(e) => this.handleChanges(e)}></input> */}

            {/* <b>Password:</b>
            <input name="password" type="password" onChange={(e) => this.handleChanges(e)}></input> */}
            <Button 
                    fullWidth
                    className={classes.button}
                    onClick={this.loginWithEmail}>
                    Get Started             
                </Button>
            {/* <button onClick={this.loginWithEmail}>Login</button>  */}
            <div className='log-reg-links'>
            <Link to="/register" className='register-link' activeClassName='active'>Create Account</Link>
            <div onClick={this.loginWithGoogle}><Link className='register-link' activeClassName='active'>Login With Google</Link></div>
        </div>
            {/* <button onClick={this.loginWithGoogle}>Login With Google</button>
            <button onClick={this.loginWithGoogle}>SignUp with Google</button> */}

        </form>
        
        </div>
        )
    }

}

export default withStyles(styles)(Login);
// export default Login;
