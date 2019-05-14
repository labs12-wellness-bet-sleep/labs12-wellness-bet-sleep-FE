import React, { Component } from 'react';
import axios from "../axios-sleep";

export default class GoogleFitAuthenticationPage extends Component {
    constructor(props){
        super(props)

        gapi.load('client:auth2', initClient);

        // send GoogleAuth to global state
        this.state = {
            userAuthorizationCode: "",
            GoogleAuth: "",
        }
    }

    // 1) oAuth get request 
    
    // https://developers.google.com/fit/rest/v1/get-started
    // https://developers.google.com/identity/protocols/OAuth2UserAgent

    // for scope: https://developers.google.com/identity/protocols/googlescopes
    connectGoogleAPIWithWellnessBetApp() {
        gapi.client.init({
            'apiKey': process.env.google_api_key,
            'clientId': process.env.google_fitness_app_client_id,
            'scope': 'https://www.googleapis.com/auth/fitness.activity.read',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/fit/2.12.49/rest']
        }).then(function () {
            let G_Auth = gapi.auth2.getAuthInstance();
            this.setState({GoogleAuth: G_Auth});
            
            // Listen for sign-in state changes.
            this.state.GoogleAuth.isSignedIn.listen(updateSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.)
            var user = this.state.GoogleAuth.currentUser.get();
            setSigninStatus();

            // Call handleAuthClick function when user clicks on
            //      "Sign In/Authorize" button.
            $('#sign-in-or-out-button').click(function() {
                handleAuthClick();
            }); 
            $('#revoke-access-button').click(function() {
                revokeAccess();

            });
        })

    }

    handleAuthClick() {
        if (this.state.GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            this.state.GoogleAuth.signOut();
        } else {
            // User is not signed in. Start Google auth flow.
            this.state.GoogleAuth.signIn();
        }
    }

    revokeAccess() {
       this.state.GoogleAuth.disconnect();
    }

    setSigninStatus(isSignedIn) {
        var user = this.state.GoogleAuth.currentUser.get();
        var isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
          $('#sign-in-or-out-button').html('Sign out');
          $('#revoke-access-button').css('display', 'inline-block');
          $('#auth-status').html('You are currently signed in and have granted ' +
              'access to this app.');
        } else {
          $('#sign-in-or-out-button').html('Sign In/Authorize');
          $('#revoke-access-button').css('display', 'none');
          $('#auth-status').html('You have not authorized this app or you are ' +
              'signed out.');
        }
      }

      updateSigninStatus(isSignedIn) {
        this.setSigninStatus();
      }



    // 2) retrieving the Google Fit Auth token and storing it
    // in local storage to make another get request to access sleep data 

    // 3) store that sleep data on the React site, and
    // aggregate it among the team 

    render() {
        return{

        }
    }
}