import React, { Component } from "react";
import axios from "axios";
import { storage, auth } from "../../FirebaseConfig";
import { withStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './register-styles.css';

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
        marginBottom: '2rem',
        paddingLeft: '4rem',
        height: '57px',
        width: '60%',
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


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      fullName: "",
      registered: false,
      welcomeMessage: "Please register before logging in.",
      profilePhotoImg: null,
      profilePhoto: ""
    };

    this.usrEmail = React.createRef();
    this.usrPassword = React.createRef();
  }

  componentDidMount() {
    if (this.state.registered == false) {
      this.setState({ welcomeMessage: "Please register before logging in." });
    }
  }

  handleChanges = e => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleUploadChange = e => {
  //   e.preventDefault();
  //   if (e.target.files[0]) {
  //     const profilePhotoImg = e.target.files[0];
  //     this.setState(() => ({ profilePhotoImg }));
  //   }
  // };

    registerWithEmail = event => {
        event.preventDefault()
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

  register = e => {
    e.preventDefault();

    let currentImageName = "firebase-image-" + Date.now();

    let uploadImage = storage
      .ref(`images/${currentImageName}`)
      .put(e.target.files[0]);
   
    uploadImage.on(
      "state_changed",
      snapshot => {},
      error => {
        alert(error);
      },
      () => {
        storage
          .ref("images")
          .child(currentImageName)
          .getDownloadURL()
          .then(url => {
            this.setState({
              profilePhoto: url
            });

            
            //store image object in the database
            const user = {
              username: this.state.username,
              password: this.state.password,
              email: this.state.email,
              fullName: this.state.fullName,
              profilePhoto: url
            };
            


            axios
              .post("https://sleep-bet.herokuapp.com/api/users/register", user)
              .then(result => {
                console.log(result);
                this.setState({
                  registered: true,
                  welcomeMessage: `Congratulations for registering, ${
                    result.data.username
                  }`
                });
                console.log("Congratulations on registering!");
                console.log(result);
              })
              .catch(error => console.log(error));

            // this.props.history.push("/users");
          });
      }
    );
  };

  render() {
    const { classes } = this.props;   
    return (
        <div className='register'>

        <div className='overlay'>
      <div className="register-wrapper">
        <h2 className='register-header'>Create Account</h2>

        <div className="registerMessage">{this.state.welcomeMessage}</div>

        <form  className='register-form'>
       
        {/* <TextField
                autoFocus
                type="text"
                fullWidth
                required
                value={this.state.fullName}
                // onChange={this.handleChanges}
                placeholder='Full Name'
                InputProps={{
                    className: classes.input,
                    disableUnderline: true ,
                }}
              /> */}
             
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
              {/* <br /> */}
              

               <div className='profile-image'>
              
              <img src={this.state.profilePhoto} className='profile-pic'/>
              
              <label className='custom-file-upload'>
              Add Photo
              <input className='image-upload' type="file"  onChange={e => this.register(e)} />

              </label>
              
            {/* <div className='img-preview'>  */}
            {/* </div> */}
            </div> 

                {/* <Button 
                    fullWidth
                    className={classes.button}>
                    Get Started             
                </Button> */}
                {/* <button onClick={this.registerWithEmail}>register with google</button> */}
                <button  onSubmit={this.registerWithEmail} type='submit'>register</button>

        </form>

{/* 
        <form onSubmit={this.register}>
          <b>Full Name:</b>
          <input
            name="fullName"
            type="text"
            onChange={e => this.handleChanges(e)}
          />
          <b>User Name:</b>
          <input
            name="username"
            type="text"
            onChange={e => this.handleChanges(e)}
          />

          <b>Email:</b>
          <input
            name="email"
            type="text"
            onChange={e => this.handleChanges(e)}
          />

          <b>Password:</b>
          <input
            name="password"
            type="password"
            onChange={e => this.handleChanges(e)}
          />

          <b>Profile Photo:</b>

          
          <input type="file" onChange={e => this.register(e)} />
            <div className='img-preview'>
                <img src={this.state.profilePhoto}/>
            </div>
        
          <button type="submit">Submit</button>
        </form> */}
      </div>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
