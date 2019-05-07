
import React, { Component } from 'react';

var authorizationURL = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22942C&redirect_uri=http%3A%2F%2Fexample.com%2Ffitbit_auth&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"


export default class FitBitOAuth extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    authorizeFitbitAccount = () => {
        
    }
}

// set up button component to Authenticate Fit Bit 

// set up button component to Log Out Fit Bit Data 