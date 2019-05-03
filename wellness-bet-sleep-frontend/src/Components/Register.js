import React, { Component } from "react";
import axios from "axios";

import { storage } from "../FirebaseConfig";

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

            // store image object in the database
            const user = {
              username: this.state.username,
              password: this.state.password,
              email: this.state.email,
              fullName: this.state.fullName,
              profilePhoto: url
            };

            axios
              .post("http://localhost:8080/api/users/register", user)
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
  };

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
          <input type="file" onChange={e => this.register(e)} />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
