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

            group: "",
            groupUsers: [],
            loggedInUsersAndData: {},
            
            fitbitUserID: "",
            fitbitAccessToken: "",

            currentUser: {},
            currentUserSleep: "",
            currentUserAggregatedSleep: "",

            startDate: "",
            endDate: "",
            daysLeft: "",

        }
    }

    componentDidMount() {
        this.getGroupID();
        this.getGroupInfo(groupID);
        this.getDateRange();
        this.calculateTimeLeft();
        this.getCurrentUserSleepData();
        this.calculateCurrentUserAggregatedData();
    }

    getDateRange() {
        this.setState({startDate: group.startDate, endDate: group.endDate})
    }

    // check firebase restricted 
    getGroupID() {

    }

    getGroupInfo(id) {
        axios.get(`https://sleep-bet.herokuapp.com/api/groups/:${id}`)
        .then(response => this.setState({group: response.data}))
        .catch(err => console.log(err));
    }

    // https://www.tutorialspoint.com/How-to-subtract-days-from-a-date-in-JavaScript
    calculateTimeLeft() {
        let todaysDate = new Date();
        let daysRemaining = endDate - todaysDate.getDate();
        this.setState({daysLeft: daysRemaining}); 
    }

    getCurrentUserSleepData() {
        axios.get(`https://api.fitbit.com/1.2/user/${this.state.fitbitUserID}/sleep/date/${this.state.startDate}/${this.state.endDate}.json`)
                .then(data => {
                    this.setState({currentUserSleep: data });
        })
    }

    calculateCurrentUserAggregatedData() {

        // alternative b) make up random numbers

        this.state.currentUserSleep.map(sleepNight => {
            this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep += sleepNight.timeleft})
        })

        this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep/60});
    }

    render(){
        return(

            <div className="GroupDashboard">
            
            <UsersRanking users={this.state.loggedInUsersAndData} startDate={this.state.startDate} endDate={this.state.endDate}/>
            <TimeLeft timeleft={this.state.daysLeft}/>
            <UserSleepStatus currentUserSleep={this.state.currentUserSleep} totalSleep={currentUserAggregatedSleep}/>

            <AggregatedSleepGraph loggedInUsersAndData={this.state.loggedInUsersAndData}/>
            </div>
        
        );
    }
}