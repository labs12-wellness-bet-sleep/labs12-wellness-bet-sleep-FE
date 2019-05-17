import React, { Component } from "react";
import axios from "../../axios-sleep";
import { connect } from 'react-redux';
import { register, getProfile } from './../../Store/Actions/auth';
import { storage, auth, googleProvider } from "../../FirebaseConfig";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './register-styles.css';

const styles = theme => ({
  card: {
    maxWidth: 345,
    borderRadius: '50%',
    height: '280px',
    border: '1px solid red',
  },
  media: {
    height: 140,
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
      height: '60px',
      width: '40%',
  }, 

  button: {
    border: '1px solid white',
    backgroundColor: 'none', 
    // border: 'none',
    borderRadius: '2rem',
    // backgroundColor:'#004CA8',
    color: 'white',
    fontSize: '1rem',
    height: '70px',
    marginTop: '2rem',
    width: '20%',
    // '&:hover': {
    //     backgroundColor:'#004CA8',
    // }
}
 
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {

    
      email: "",
      password: "",
      fullName: "",
      registered: false,
      welcomeMessage: "Please register before logging in.",
      profilePhotoImg: null,
      profilePhoto: "",
      file: null
    };
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


  signUp = event => {
    event.preventDefault()

    let currentImageName = "firebase-image-" + Date.now();


    let email = this.state.email; 
    let password = this.state.password;

    auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      console.log("OAuth User:", user);
      const {uid, email, ra} = user; 
        
      const id = uid
      localStorage.setItem("token", ra);

      let uploadImage = storage
        .ref(`images/${currentImageName}`)
        .put(this.state.file);

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
                console.log(url)
                this.setState({
                  profilePhoto: url
                });
                const user = {
                  email: this.state.email,
                  fullName: this.state.fullName,
                  profilePhoto: url,
                  // firebase_id: uid
                };
                console.log(user, 'in signup')
                this.props.signUp(user)
                this.props.history.push(`/user/${id}`);
                // this.props.history.push('/users')
              });
          }
        );
       
       

    })
    
  }

  fileHandler =(e)=> {
    this.setState({
      file: e.target.files[0]
    })
  }

  
  loginWithGoogle = event => {
    event.preventDefault()
    auth.signInWithPopup(googleProvider)
    .then(({user}) => {
        console.log(user, 'google signin')
        let currentImageName = "firebase-image-" + Date.now();


      console.log("OAuth User google popup:", user);
      const {uid, email, ra} = user; 
      const id = uid
      localStorage.setItem("token", ra);
        let uploadImage = storage
        .ref(`images/${currentImageName}`)
        .put(this.state.file);
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
                console.log(url,'url')
                this.setState({
                  profilePhoto: url
                });
                const user = {
                  email: this.state.email,
                  fullName: this.state.fullName,
                  profilePhoto: url,
                  // id: this.props.user.id
                };
                console.log(user, 'in signup')
                this.props.signUp(user)
                this.props.history.push(`/user/${id}`);
                
              });
          }
        );
    })
    .catch(err => console.error(err));

}


  render() {
    const { classes } = this.props;
    console.log(this.props.user, 'register props')
    return (
      <div className="register">
        <div className='overlay'>
       

        {/* <div className="registerMessage">{this.state.welcomeMessage}</div> */}

{/* <div className='form-wrapper'> */}
<h2 className='title'>Create Account</h2>
        <form  onSubmit={this.signUp} className='register-form'>
        <TextField
                autoFocus
                type="text"
                name='fullName'
                fullWidth
                required
                onChange={(e) => this.handleChanges(e)}
                placeholder='Name'
                InputProps={{
                    className: classes.input,
                    disableUnderline: true ,
                }}
              />
             {/* <div className='img-upload'>
              <img src={this.state.profilePhotoImg} className='profile-img '/> 
             <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.state.profilePhotoImg}
          title="Contemplative Reptile"
        />
         </CardActionArea>
         </Card> 
          </div>  */}
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

             <TextField
                fullWidth
                type="password"
                name='password'
                required
                placeholder='Password'
                onChange={(e) => {this.handleChanges(e)}}
                InputProps={{
                     className: classes.input,
                     disableUnderline: true ,
                }}
             />
        

          <b>Profile Photo:</b>

        
          <input type="file" className='upload-input' accept="image/*" onChange={e => this.fileHandler(e)} />
          {/* <div className='img-upload'>
              <img src={this.state.profilePhoto} className='profile-img '/> */}
              {/* <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.state.profilePhotoImg}
          title="Contemplative Reptile"
        />
         </CardActionArea>
         </Card>  */}
         {/* </div> */}
          <Button 
            // fullWidth
            className={classes.button}
            onClick={this.signUp}
          >
            Continue            
          </Button>
          {/* <button >Submit</button> */}
          <button type="button" onClick={this.loginWithGoogle}>SignUp with Google</button>
        </form>
        {/* </div> */}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  console.log(state, 'mstp')
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (user) => dispatch(register(user)),
    profilePage: id =>  dispatch(getProfile(id))
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
