import React, { Component } from 'react';
import axios from 'axios';

import AggregatedSleepGraph from "./AggregatedSleepGraph.js";
import TimeLeft from "./TimeLeft.js";
import UserSleepStatus from "./UserSleepStatus.js";
import UsersRanking from "./UsersRanking.js"

export default class GroupDashboard extends Component {

    constructor(props){
        super(props)

        this.state = {

            groupID: "",

            loggedInUsersAndData: {},
            
            fitbitUserID: "",
            fitbitAccessToken: "",

            currentUser: {},
            currentUserSleep: "",
            currentUserAggregatedSleep: "",

            daysLeft: "",

        }
    }

    componentDidMount() {
        this.retrieveUserSleepData();
        this.calculateTimeLeft();
    }

    getDateRange() {

    }

    calculateTimeLeft() {

    }

    // 

    retrieveUserSleepData() {

    }

    amountOfSleepLeft() {

    }

    // go on fitBit to retrieve data?
    logSleep() {

    }

    render(){
        return(
            <div className="GroupDashboard">
            
            <UsersRanking users={this.state.loggedInUsersAndData}/>
            <TimeLeft/>
            <UserSleepStatus/>

            <AggregatedSleepGraph loggedInUsersAndData={this.state.loggedInUsersAndData}/>
            </div>
        );
    }
}