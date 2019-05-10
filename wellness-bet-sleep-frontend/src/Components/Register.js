import React, { Component } from "react";
import axios from "../axios-sleep";

import { storage, auth, googleProvider } from "../FirebaseConfig";

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

  // handleUploadChange = e => {
  //   e.preventDefault();
  //   if (e.target.files[0]) {
  //     const profilePhotoImg = e.target.files[0];
  //     this.setState(() => ({ profilePhotoImg }));
  //   }
  // };

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
                  username: this.state.username,
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
                console.log(url)
                this.setState({
                  profilePhoto: url
                });
               
                // store image object in the database
                const user = {
                  username: this.state.username,
                  email: email,
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
    .catch(err => console.error(err));

}


  render() {
    return (
      <div className="register">
        <h2>Register</h2>

        <div className="registerMessage">{this.state.welcomeMessage}</div>

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

          {/* <input type="file" onChange={e => this.handleUploadChange(e)} /> */}
          <input type="file" accept="image/*" onChange={e => this.fileHandler(e)} />

          <button>Submit</button>
          <button type="button" onClick={this.loginWithGoogle}>SignUp with Google</button>
        </form>
      </div>
    );
  }

}

export default Register;
