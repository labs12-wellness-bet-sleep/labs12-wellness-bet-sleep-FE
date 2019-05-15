import React, { Component } from "react";
import axios from "../../axios-sleep";
import { connect } from 'react-redux';
import { register } from './../../Store/Actions/auth';
import { storage, auth, googleProvider } from "../../FirebaseConfig";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
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
      // marginTop: '2rem',
      paddingLeft: '4rem',
      height: '70px',
      width: '80%',
  }, 
 
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
               
                // store image object in the database
                const user = {
                  // username: this.state.username,
                  email: this.state.email,
                  fullName: this.state.fullName,
                  profilePhoto: url
                };
                console.log(user, 'in signup')
                this.props.signUp(user)
                // axios
                //   .post("/api/users/register", user, {headers: {"authorization":ra}})
                //   .then(result => {
                //     console.log(result);
                //     this.setState({
                //       registered: true,
                //       welcomeMessage: `Congratulations for registering, ${
                //         result.data.username
                //       }`
                //     });
                //     console.log("Congratulations on registering!");
                //     console.log(result);
                //   })
                //   .catch(error => console.log(error));
    
                this.props.history.push(`/login/${user.email}`);
              });
          }
        );


    })
    
  }
  register = e => {
    e.preventDefault();

    let currentImageName = "firebase-image-" + Date.now();


    let email = this.state.email; 
    let password = this.state.password;

    auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      console.log("OAuth User:", user);
      const {uid, email, ra} = user; 

      
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
               
                // store image object in the database
                const user = {
                  // username: this.state.username,
                  email: this.state.email,
                  fullName: this.state.fullName,
                  profilePhoto: url
                };
                
                axios
                  .post("/api/users/register", user, {headers: {"authorization":ra}})
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
    
                this.props.history.push("/users");
              });
          }
        );


    })
    .catch(error => {
      console.log(error);
    });
  };


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


      console.log("OAuth User:", user);
      const {uid, email, ra} = user; 
      
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
               
                // store image object in the database
                const user = {
                  // username: this.state.username,
                  email: email,
                  fullName: this.state.fullName,
                  profilePhoto: url
                };
                
                this.props.signUp(user)
                // axios
                //   .post("/api/users/register", user, {headers: {"authorization":ra}})
                //   .then(result => {
                //     console.log(result);
                //     this.setState({
                //       registered: true,
                //       welcomeMessage: `Congratulations for registering, ${
                //         result.data.username
                //       }`
                //     });
                //     console.log("Congratulations on registering!");
                //     console.log(result);
                //   })
                //   .catch(error => console.log(error));
    
                this.props.history.push("/users");
              });
          }
        );
    })
    .catch(err => console.error(err));

}


  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div className="register">
        <div className='overlay'>
        <h2>Create Account</h2>

        <div className="registerMessage">{this.state.welcomeMessage}</div>

        <form onSubmit={this.signUp}>
        {/* <TextField
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
              /> */}
              {/* <div className='img-upload'>
              <img src={this.state.profilePhotoImg} className='profile-img '/> */}
             {/* <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.state.profilePhotoImg}
          title="Contemplative Reptile"
        />
         </CardActionArea>
         </Card> */}
         {/* </div> */}
               {/* <TextField
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
              /> */}

             {/* <TextField
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
             /> */}
          <b>Full Name:</b>
          <input
            name="fullName"
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

          {/* <input type="file" onChange={e => this.handleUploadChange(e)} /> */}
          <input type="file" accept="image/*" onChange={e => this.fileHandler(e)} />
          <div className='img-upload'>
              <img src={this.state.profilePhotoImg} className='profile-img '/>
             {/* <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.state.profilePhotoImg}
          title="Contemplative Reptile"
        />
         </CardActionArea>
         </Card> */}
         </div>
          <button>Submit</button>
          <button type="button" onClick={this.loginWithGoogle}>SignUp with Google</button>
        </form>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (user) => dispatch(register(user))
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Register);
