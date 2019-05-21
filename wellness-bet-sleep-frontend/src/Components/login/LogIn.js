import React, { Component } from 'react';
import axios from '../../axios-sleep';
import { connect } from 'react-redux';
import { login, getProfile, register } from './../../Store/Actions/auth';
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
                localStorage.setItem("token", ra);
                let id = uid
                const data = {
                    email: this.state.email,
                    fullName: this.state.fullName,
                    // profilePhoto: url,
                    firebase_id: uid
                  };
                this.props.emailLogin(user)
                this.props.history.push(`/user/${id}`)
             })
            .catch(
                error => {
                console.log(error)
        })
       
    }

    loginWithGoogle = event => {
        event.preventDefault()
        // let email = this.state.email
        // let password = this.state.password

        auth.signInWithPopup(googleProvider)
        .then(({user}) => {
            console.log(user, 'google signin')
            
            const {uid, email, ra} = user; 
            localStorage.setItem("token", ra);

            this.props.history.push(`/user/${uid}`)
            // this.props.emailLogin(user)
           
            // const data = {
            //     email: email,
            //     fullName: this.state.fullName,
                
            //   };

            
            // axios.get(`/api/users/login/${user.email}`, {headers: {"Authorization":user.ra}} )
            // .then(response => {
            //     console.log(response);
            // })
        })
        // .catch(err => console.error(err))
        
    }
    
    render() {
        const { classes } = this.props;  
        return(

        <div className="login-wrapper">
            <header className='login-header'>
                <img src={wellnessLogo} alt='Wellness Logo' className='wellness-logo'/><br />
                <span className='top'>Wellness Bet </span><br />
                <span className='bottom'>Sleep</span>
            </header>
            <form className='login-form'>
                <FontAwesomeIcon icon={faUserCircle} size='lg' className='fa-users'/>
                <TextField
                    autoFocus
                    type="email"
                    name='email'
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
                    name='password'
                    required
                    placeholder='Password'
                    onChange={(e) => this.handleChanges(e)}
                    InputProps={{
                        className: classes.input,
                        disableUnderline: true ,
                    }}
                />
                <Button 
                    fullWidth
                    className={classes.button}
                    onClick={this.loginWithEmail}>
                    Get Started             
                </Button>
                <div className='log-reg-links'>
                    <Link to="/register" className='register-link' activeClassName='active'>Create Account</Link>
                    <div onClick={this.loginWithGoogle}><Link className='register-link' activeClassName='active'>Login With Google</Link></div>
                </div>
            </form>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
      emailLogin: (user) => dispatch(login(user)),
      profilePage: user =>  dispatch(getProfile(user)),
      signUp: (user) => dispatch(register(user)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
