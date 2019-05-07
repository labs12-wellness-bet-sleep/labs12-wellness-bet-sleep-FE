import React, { Component } from 'react';
import axios from 'axios';

export default class UserSleepData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sleepData: ""
        }
    }

    // Step 1) get sleep tracking per user, based on a given range of date
    getSleepTrackingDataPerUser = (startDate,endDate) => {
        axios.get(`https://api.fitbit.com/1.2/user/${this.props.user-id}/sleep/date/${startDate}/${endDate}.json`)
            .then(data => {
                this.setState({sleepData: data});
            })
            .catch(err => console.log(err));
    }

    // Step 2) Each user's sleep data is plotted out in a coordinate array, which is sent to props 

    // The dashboard - a React component higher up than the User & UserSleepData component - will then render
    //  

    // timeInBed is a FitBit datafield 
    addSleepCoordinates = () => {
        this.state.sleepData.map(day => {
            this.props.coordinates.push(day.timeInBed);
        })
    }
}