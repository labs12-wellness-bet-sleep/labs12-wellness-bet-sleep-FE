import React, { Component } from 'react';
import axios from 'axios';

import AggregatedSleepGraph from "./AggregatedSleepGraph.js";
import TimeLeft from "./TimeLeft.js";
import UserSleepStatus from "./UserSleepStatus.js";
import UsersRanking from "./UsersRanking.js"
import styled from 'styled-components'

const HeaderData = styled.div`
    display: flex;
    flex-directon: row; 
    color: #89cff0;
    justify-content: space-between;
`

const HeaderItem = styled.div`
    width: 33%;
`

const HorizontalInfo = styled.div`
    display: flex;
    flex-directon: row; 
`

export default class GroupDashboard extends Component {

    constructor(props){
        super(props)

        this.state = {

            groupID: 3,

            group: "",
            groupUsers: [],
            amountOfUsers: "",
            aggregatedSleepPerUser: [],
            sleepGraphCoordinatesPerPerson: [],

            fitbitUserID: "",
            fitbitAccessToken: "",

            currentUser: {},
            currentUserSleep: "",
            currentUserAggregatedSleep: "",

            startDate: "",
            endDate: "",
            daysLeft: "",
            amountOfDays: ""

        }

        this.getDataAfterStateUpdated();

    }

    componentDidMount() {

        this.getData();
        this.getDataAfterStateUpdated();

        console.log("After component did mount: " , this.state);
    }

    getData() {
        this.getGroupID();
        this.getGroupInfo(this.state.groupID);
    }

    getDataAfterStateUpdated() {
        this.getCurrentUserSleepData();
        this.calculateCurrentUserAggregatedData();
    }

    getDateRange(startDate, endDate) {
        this.setState({startDate: startDate, endDate: endDate, amountOfDays: endDate-startDate})
    }

    // check firebase restricted 
    getGroupID() {
    }

    getGroupInfo = () => {

        let amountOfDays = "";

        axios.get(`https://sleep-bet.herokuapp.com/api/groups/${this.state.groupID}`)
        .then(response => {
            this.getDateRange(response.data.startDate,response.data.endDate);
            this.calculateTimeLeft(response.data.endDate);
            console.log("Group: ", response.data);
            this.setState({group: response.data});

            amountOfDays = 30;
            console.log("Amount of days: ", amountOfDays);
        })
        .catch(err => console.log(err));

        axios.get(`https://sleep-bet.herokuapp.com/api/groups/${this.state.groupID}/participant`)
        .then(response => {
            console.log("Participants: ", response.data.participant);
            this.setState({groupUsers: response.data.participant});
            this.setState({amountOfUsers: this.state.groupUsers.length});

            this.setUpDummySleepData(response.data.participant.length, response.data.participant, amountOfDays);

            axios.get(`https://sleep-bet.herokuapp.com/api/groups/${this.state.groupID}/participant`)
            .then(response => {
                    let participants = response.data;
                    console.log("Look at this response", response);
             
                    participants.map(participant => {

                    let userSleepData = JSON.parse(participant.SleepData); 

                    let totalSleepInHoursPerDay = this.convertMillisecondsToHours(userSleepData.activeTimeMillis);
                    
                    // see: https://stackoverflow.com/questions/4673527/converting-milliseconds-to-a-date-jquery-javascript
                    let StartDate = new Date(userSleepData.startTimeMillis);
                    let EndDate = new Date(usersSleepData.endTimeMillis);

                    this.calculateSleepCoordinatesPerDay(StartDate,EndDate, totalSleepInHoursPerDay);
                    this.mapSleepDataToUserOnLeaderDashboard(participant.id, totalSleepInHoursPerDay);

                })
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    convertMillisecondsToHours = (millseconds) => {
        let hours = millseconds/3600000;
        return hours; 
    }

    calculateSleepCoordinatesPerDay = (startTime, endTime, sleepAmount) => {
        
    }

    mapSleepDataToUserOnLeaderDashboard = (id, sleepAmount) => {

    }

    // https://www.tutorialspoint.com/How-to-subtract-days-from-a-date-in-JavaScript
    calculateTimeLeft(endDate) {
        this.setState({daysLeft: 10}); 
    }

    getCurrentUserSleepData() {

        this.setState({currentUserSleep: 8})
        // axios.get(`https://api.fitbit.com/1.2/user/${this.state.fitbitUserID}/sleep/date/${this.state.startDate}/${this.state.endDate}.json`)
        //         .then(data => {
        //             this.setState({currentUserSleep: data });
        // })
    }

    calculateCurrentUserAggregatedData() {

        // alternative b) make up random numbers

        this.setState({currentUserAggregatedSleep: 24})
        // this.state.currentUserSleep.map(sleepNight => {
        //     this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep += sleepNight.timeleft})
        // })

        // this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep/60});
    }

    // in hours 
    setUpDummySleepData(sleepDataAmount, participants, amountOfDays) {
        let amountOfUsers = sleepDataAmount;
        let totalSleepPerPerson = [];

        for(let i = 0; i < sleepDataAmount; i++) {
            totalSleepPerPerson[i] = {
                username: participants[i].username,
                photo: participants[i].profilePhoto,
                amountOfSleep: Math.floor((Math.random()*50) + 1)
            }
        }

        this.setState({aggregatedSleepPerUser: totalSleepPerPerson});

       let sleepGraphCoordinatesPerPerson = [];

        for(let i = 0; i < amountOfUsers; i++) {
                sleepGraphCoordinatesPerPerson[i] = {
                    name: participants[i].username,
                    coordinates: []
                }

                for(let days = 0; days < amountOfDays; days++) {
                    sleepGraphCoordinatesPerPerson[i].coordinates[days] = {"x": days, "y": totalSleepPerPerson[i].amountOfSleep - days}
                }
            }

        this.setState({sleepGraphCoordinatesPerPerson: sleepGraphCoordinatesPerPerson});
            
        console.log("Sleep Coordinates: ", sleepGraphCoordinatesPerPerson);
        }


    render(){

        console.log("After data is updated: " , this.state);
        return(

            <div className="GroupDashboard">

            <HeaderData>

            <HeaderItem>
            <b><h2>Group: {this.state.group.groupName}</h2></b>

            <b>Last day of competiton: {this.state.group.endDate}</b>
            </HeaderItem>

            <HeaderItem>
            <h2>Pot Total: $500</h2>
            </HeaderItem>
            </HeaderData>

            <HorizontalInfo>
            <UsersRanking usersSleepData={this.state.aggregatedSleepPerUser}/>
            <TimeLeft timeleft={this.state.daysLeft}/>
            <UserSleepStatus currentUserSleep={this.state.currentUserSleep} totalSleep={this.state.currentUserAggregatedSleep}/>
            </HorizontalInfo>

            <AggregatedSleepGraph sleepCoordinatesPerPerson={this.state.sleepGraphCoordinatesPerPerson}/>
            </div>
        
        );
    }
}