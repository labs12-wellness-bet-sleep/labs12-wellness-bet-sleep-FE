// import React, { Component } from 'react';
// import axios from '../axios-sleep';
// import { auth, googleProvider } from '../FirebaseConfig';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             loggedIn: false, 
//             loginMessage: "Please log in."
//         }
//     }

//     componentDidMount(){
//         if(this.state.loggedIn == false){
//             this.setState({loginMessage: "Please log in."})
//         }
//     }


//     handleChanges = e => {
//         e.preventDefault();
//         console.log(e.target.name, e.target.value);
//         this.setState({[e.target.name]: e.target.value});
//     }

//     loginWithEmail = e => {
//         e.preventDefault();
//         auth.signInWithEmailAndPassword(this.state.email, this.state.password)
//             .then(({user}) => {
//                 const { uid, email, ra} = user;
//                 console.log(user)
//                 localStorage.setItem("token", ra);
//                 axios
//                 .get(`/api/users/login/${email}`, {headers: {"authorization": ra}})
//                 .then(result => {
//                   console.log(result);
//                   this.setState({
//                     loggedIn: true,
//                     loginMessage: `Congratulations for logging in, ${
//                       result.data.username
//                     }`
//                   })
                
//                 }).catch(error => console.log(error))

//             })
//             .catch(
//                 error => {
//                 console.log(error)
//         })
//     }

//     loginWithGoogle = event => {
//         event.preventDefault()
//         auth.signInWithPopup(googleProvider)
//         .then(({user}) => {
//             console.log(user, 'google signin')
//             localStorage.setItem("token", user.ra);
//             axios.get(`/api/users/login/${user.email}`, {headers: {"authorization":user.ra}} ).
//             then(response => {
//                 console.log(response);
//             })
//         })
//         .catch(err => console.error(err))
//     }
    
//     render() {

//         return(

//         <div className="login">

//            <div className="login-message">
//             {this.state.loginMessage}
//             </div>

//         <h2>Login</h2>

//         <form>

//             <b>email:</b>
//             <input name="email" type="email" onChange={(e) => this.handleChanges(e)}></input>

//             <b>Password:</b>
//             <input name="password" type="password" onChange={(e) => this.handleChanges(e)}></input>
            
//             <button onClick={this.loginWithEmail}>Login</button> 
//             <button onClick={this.loginWithGoogle}>Login With Google</button>
//             <button onClick={this.loginWithGoogle}>SignUp with Google</button>

//         </form>
        
//         </div>
//         )
//     }

// }

// export default Login;
