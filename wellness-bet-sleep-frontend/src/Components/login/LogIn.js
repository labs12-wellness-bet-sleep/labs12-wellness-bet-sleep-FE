import React, { Component } from 'react';
import { Link, Redirect } from'react-router-dom';

import { auth, googleProvider } from '../../FirebaseConfig';
import Users from '../Users';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import '../../App';
import './login-styles.css'
import wellnessLogo from '../../assets/images/wellness-logo.png';



const LoginWrapper = styled.div`
/* align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 40%; */
    border: 1px solid red;
    
`;

const LoginTitle = styled.div`
    color: white;
    font-size: 2rem;
    
    /* border: 1px solid orange; */
    .top {
        margin-bottom: .5rem;
    }
    .bottom {
        font-weight: bold;
    }
`;
const LoginFormWrapper = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: auto;
    width: auto;
    justify-content: space-around;
    width: 100%;
    /* border: 3px solid green; */
`;

const LoginFormInput = styled.input`
    border: none;
    border-radius: 2rem;
    background-color: #abb5c488;
    color: white;
    font-size: 1rem;
    margin-top: 2rem;
    padding-left: 4rem;
    height: 55px;
    width: 60%;
    ::placeholder {
        color: white;
        font-size: 1rem;
    }
 `;
// const LoginFormButtons = styled.div`
//     display: flex;
//     /* flex-direction: column; */
//     justify-content: space-around;
//     margin-top: 2rem;
//     /* align-items: center; */
//     width: 100%;
//     border: 1px solid orange;
// `;
const LoginFormLinks = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
    width: 100%;
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
    margin-top: 2rem;
    width: 75%;
`;

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
        '&:placeholder': {
            color: 'white',
            fontSize: '2rem',
        }
    }, 
   
    button: {
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
        if(this.state.loggedIn === false){
            this.setState({loginMessage: "Please log in."})
        }
    }


    handleChanges = e => {
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    // handleChange = name => event => {
    //     console.log(event.target.name, event.target.value);
    //     this.setState({
    //       [name]: event.target.value,
    //     });
    //   };

    // loginWithEmail = e => {
    //     e.preventDefault();
    //     auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    //         .then((user) => {
    //             console.log(user)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //        this.setState({
    //            loggedIn: true
    //        })
           
    // }

    loginWithEmail = () => {
        const email = this.usrEmail.current.value
        const password = this.usrPassword.current.value
        this.usrEmail.current.value = ''
        this.usrPassword.current.value = ''
        if (!email || !password) return;
        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user)
            this.setState({
                loggedIn: true
            })
        })
        .catch(error => {
            console.log(error)
        })
    };

    //Email and Password Register
    registerWithEmail = () => {
        const email = this.usrEmail.current.value
        const password = this.usrPassword.current.value
        this.usrEmail.current.value = ''
        this.usrPassword.current.value = ''
        if (!email || !password) return;
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
    };
   
    //Google Login
    loginWithGoogle = event => {
        event.preventDefault()
        auth.signInWithPopup(googleProvider)
        .then(user => {
            console.log(user, 'google signin')
            this.setState({
                loggedIn: true
            })
    
        })
        .catch(err => console.error(err))
    };
    
    render() {
        const { classes } = this.props;    
        return(

        <div className='login-wrapper'>
            <header className='login-header'>
                {/* <div > */}
                <img src={wellnessLogo} alt='Wellness Logo' className='wellness-logo'/>
                {/* </div> */}
                <br />
                <span className='top'>Wellness Bet </span><br />
                <span className='bottom'>Sleep</span>
            </header>
            <form className='login-form'>
             <FontAwesomeIcon icon={faUserCircle} size='lg' className='fa-users'/>
            <TextField
                autoFocus
                type="email"
                fullWidth
                required
                inputRef={this.usrEmail}
                placeholder='Email'
                InputProps={{
                    className: classes.input,
                    disableUnderline: true ,
                }}
              />
            <br />
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
              <br />
                <Button 
                    fullWidth
                    className={classes.button}>
                    Get Started             
                </Button>
        </form>
        <div className='log-reg-links'>
            <Link to="/register" className='register-link' activeClassName='active'>Create Account</Link>
            <div onClick={this.loginWithGoogle}><Link className='register-link' activeClassName='active'>Login With Google</Link></div>
        </div>
    </div>
        )
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Login);

// export default Login;
