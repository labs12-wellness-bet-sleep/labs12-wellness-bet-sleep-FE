import React, { Component } from 'react';
import axios from 'axios';

export default class FrontEndDashboard extends Component {
    constructor() {
        this.state = {
            selectedFitnessTracker: "",
            userId: "",
            sleepData: ""
        }
    }

    //step 1) get sleep tracking per user, based on a given range of date
    getSleepTrackingDataPerUser = (startDate,endDate, userId) => {
        axios.get(`https://api.fitbit.com/1.2/user/${user-id}/sleep/date/${startDate}/${endDate}.json`)
            .then(data => {
                this.setState({sleepData: data});
            })
            .catch(err => console.log(err));
    }

    // Step 2) Each user's sleep data is then mapped out per day
    addSleepCoordinates = (sleep) => {

    }

    // Step 3) Plot to sleep graph & render
    plotSleepCoordinates = () => {

    }

    render() {

    }
}