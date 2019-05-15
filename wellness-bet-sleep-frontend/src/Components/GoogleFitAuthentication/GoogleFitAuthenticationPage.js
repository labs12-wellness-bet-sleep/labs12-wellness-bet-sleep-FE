import React, { Component } from 'react';
import { Button } from '@material-ui/core';

var GoogleAuth;

export default class GoogleFitAuthenticationPage extends Component {
    constructor(props){
        super(props)
        // let gapi = window.gapi; 
        // send GoogleAuth to global state
        this.state = {
            userAuthorizationCode: "",
            GoogleAuth: undefined,
            loginStatus: "",
            logInButtonName: "",
            hideRevokeButton: true
        }

        
    }

    componentDidMount() {
        console.log("GAPI: ", window.gapi);
        window.gapi.load('client:auth2', this.initClient);
    }

    // loadGoogleAPI() {
    //     console.log(window.gapi);
    // }

    // 1) oAuth get request 
    
    // https://developers.google.com/fit/rest/v1/get-started
    // https://developers.google.com/identity/protocols/OAuth2UserAgent

    // for scope: https://developers.google.com/identity/protocols/googlescopes
    initClient = () => {
        // window.gapi.client.setApiKey("AIzaSyC0dy42dXDZ6VsUrO_0qkiy2qVYVQBG20c");
        console.log(window.gapi);
        window.gapi.client.init.call(this,{
            'apiKey': "AIzaSyC0dy42dXDZ6VsUrO_0qkiy2qVYVQBG20c",
            'clientId': "831105844655-ocpq1i5u6clfco7k7291i142qdrrejgp.apps.googleusercontent.com",
            'scope': 'https://www.googleapis.com/auth/fitness.activity.read',
            // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/fit/2.12.49/rest']
        }).then(() => {
            let GAuth = window.gapi.auth2.getAuthInstance();
            console.log("Our Authentication object," , GAuth);
            console.log("It's working!");
            // Listen for sign-in state changes. Event listener
            console.log("Check GoogleAuth for config:", GAuth.isSignedIn);
            console.log(this.setSigninStatus());
            console.log(this.updateSigninStatus());
            GAuth.isSignedIn.listen(this.updateSigninStatus());
            // Handle initial sign-in state. (Determine if user is already signed in.)
            var user = GAuth.currentUser.get();
            console.log("Google User :", user.getBasicProfile());
            console.log("Google User Id:", user.getId());
            

            this.setState({GoogleAuth: GAuth});
            this.setSigninStatus();
        })

    }

    revokeAccess() {
       GoogleAuth.disconnect();
    }

    setSigninStatus(isSignedIn) {
        console.log("Inside Sign In Status, ", isSignedIn);
        console.log("Check GoogleAuth for sign in status click:", this.state.GoogleAuth);
        if(!this.state.GoogleAuth) {
            return null;
        }
        else{
            var user = this.state.GoogleAuth.currentUser.get();
            var isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/fitness.activity.read');
            if (isAuthorized) {
                this.setState({logInButtonName: "Sign Out", 
                loginStatus: "You have offically connected your Google Fitness app to our Wellness Bet App",
                hideRevokeButton: false});
            } else {
                this.setState({logInButtonName: "Sign In", 
                loginStatus: "You have officialy disconnected your Google Fitness app from our Wellness Bet App",
                hideRevokeButton: true});
                
            }
        }
    }

      handleAuthClick() {
        if(!this.state.GoogleAuth) {
            return null;
        }
        else{
            console.log("Check GoogleAuth for handle auth click:", GoogleAuth);
            if (this.state.GoogleAuth.isSignedIn.get()) {
                // User is authorized and has clicked 'Sign out' button.
                this.state.GoogleAuth.signOut();
            } else {
                // User is not signed in. Start Google auth flow.
                this.state.GoogleAuth.signIn();
            }
        }
    }


      updateSigninStatus() {
        console.log("Fun!");
        this.setSigninStatus();
      }



    // 2) retrieving the Google Fit Auth token and storing it
    // in local storage to make another get request to access sleep data 

    // 3) store that sleep data on the React site, and
    // aggregate it among the team 

    // https://agilewarrior.wordpress.com/2017/10/10/how-to-hide-elements-the-reactjs-way/

    render() {

        const ButtonStyle = this.state.hideRevokeButton ? {display: 'none'} : {}

        if(!this.state.GoogleAuth){
            return(
                <div className="Google Fit OAuth"></div>
            )
        }
        else {
            return(
                <div className="Google Fit OAuth">
                
                {this.state.loginStatus}
    
                <div className="description">
                This connects/disconnects your Google Fitness sleep data to your Wellness Bet App. 
                </div>
    
                <button onClick={this.handleAuthClick()}>{this.state.logInButtonName}</button>
                <button onClick={this.handleAuthClick()} style={ButtonStyle}>Revoke Access To App</button>
    
                </div>
            )
        }
    }
}