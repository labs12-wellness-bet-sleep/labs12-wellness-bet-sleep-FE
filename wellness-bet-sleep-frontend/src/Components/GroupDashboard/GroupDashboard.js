import React, { Component } from 'react';
import AggregatedSleepGraph from "./AggregatedSleepGraph.js";
import TimeLeft from "./TimeLeft.js";
import UserSleepStatus from "./UserSleepStatus.js";
import UsersRanking from "./UsersRanking.js"

export default class GroupDashboard extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="GroupDashboard">
            
            <UsersRanking/>
            <TimeLeft/>
            <UserSleepStatus/>

            <AggregatedSleepGraph/>
            </div>
        );
    }
}