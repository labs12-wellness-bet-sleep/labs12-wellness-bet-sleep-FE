import React, { Component } from 'react';
import axios from 'axios';

import AggregatedSleepGraph from "./AggregatedSleepGraph.js";
import TimeLeft from "./TimeLeft.js";
import UserSleepStatus from "./UserSleepStatus.js";
import UsersRanking from "./UsersRanking.js"
import styled from 'styled-components'
import { start } from 'repl';

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

            // this.setUpDummySleepData(response.data.participant.length, response.data.participant, amountOfDays);

            let participants = response.data;
            console.log("Look at this response", response);

            let totalSleepPerGroup = [];
            let sleepGraphCoordinatesPerGroup = [];
             
            participants.map(participant => {

                    let userSleepDataSessions = JSON.parse(participant.SleepData); 

                    let sleepPerUser = { 
                        username: participant.username,
                        photo: participant.profilePhoto,
                        amountOfSleep: ""
                    }

                    let sleepGraphCoordinatesPerPerson = {
                        name: participant.username,
                        coordinates: []
                    }

                    let dayNumber = 0; 

                    userSleepDataSessions.map((sleepDataSession) => {

                        let totalSleepInHoursPerDay = this.convertMillisecondsToHours(userSleepData.activeTimeMillis);
                        
                        let startTime = userSleepData.startTimeMillis;
                        let endTime = usersSleepData.endTimeMillis;

                        if(isSleepInSameDay(startTime,endTime)){

                            let sleepCoordinate = this.calculateSleepCoordinatesPerDay(startTime,endTime, totalSleepInHoursPerDay,dayNumber);
                            sleepCoordinatesPerPerson.coordinates.push(sleepCoordinate);
                            dayNumber += 1; 

                        }
                        else
                        {
                            sleepCoordinatesPerPerson = calculateSleepCoordinatesPerSeveralDays(startTime,endTime,totalSleepInHoursPerDay,sleepGraphCoordinatesPerPerson, dayNumber);

                            let StartDate = new Date(startTime);
                            let EndDate = new Date(endTime);
                    
                            let dayDifference = Math.abs(StartDate.getDate()-EndDate.getDate());

                            daynNumber += dayDifference;
                        }

                        sleepPerUser.amountOfSleep += totalSleepInHoursPerDay;

                    })
            })

            this.setState({aggregatedSleepPerUser: totalSleepPerGroup});
            this.setState({sleepGraphCoordinatesPerPerson: sleepGraphCoordinatesPerGroup});

            }).catch(err => console.log(err));
        }

    convertMillisecondsToHours = (millseconds) => {
        let hours = millseconds/3600000;
        return hours; 
    }

    isSleepInSameDay = (startTime, endTime) => {
        
        let StartDate = new Date(startTime);
        let EndDate = new Date(endTime);

        let dayDifference = Math.abs(StartDate.getDate()-EndDate.getDate());

        let StartHour = StartDate.getHours();
        let EndHour = EndDate.getHours();

        // (I count the same day as from 8pm - 10am)
        // Check if the start time is within this buffer zone. 
        // see: https://stackoverflow.com/questions/4673527/converting-milliseconds-to-a-date-jquery-javascript
        if ( (StartHour > 20 || StartHour < 10 ) && (EndHour > 20 || StartHour < 10) && dayDifference <= 1) {
            return true; 
        }
        else {
            return false; 
        }
    }

    // per sleep session;
    calculateSleepCoordinatesPerDay = (startTime, endTime, sleepAmount, day) => {
        
        let sleepCoordinate = {"x": day, "y": sleepAmount}
        return sleepCoordinate;
    }

    // per sleep session;
    calculateSleepCoordinatesPerSeveralDays = (startTime, endTime, sleepAmount, sleepCoordinatesPerPerson, dayNumber) => {
        let StartDate = new Date(startTime);
        let EndDate = new Date(endTime);

        let startDay = StartDate.getDate();
        let endDay = EndDate.getDate();

        let startHour = StartDate.getHours();

        let dayDifference = Math.abs(endDay-startDay);

        // first add the remainder beginning day;
        let startDaySleepAmount = 24 - startHour; 

        sleepCoordinatesPerPerson.coordinates.push({"x": dayNumber, "y": startDaySleepAmount}); 

        sleepAmount -= startDaySleepAmount;

        for(day = (dayNumber+1) ; day < (dayNumber + dayDifference-1); day++) {
            sleepCoordinatesPerPerson.coordinates.push({"x": dayNumber, "y": sleepAmount-23});
        }

        let endHour = EndDate.getHours();
        dayNumber += dayDifference;
        
        sleepCoordinatesPerPerson.coordinates.push({"x": dayNumber, "y": endHour})

        // then add the remainder end day sleep; 

        return sleepCoordinatesPerPerson; 

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
    // setUpDummySleepData(sleepDataAmount, participants, amountOfDays) {
    //     let amountOfUsers = sleepDataAmount;
    //     let totalSleepPerPerson = [];

    //     for(let i = 0; i < sleepDataAmount; i++) {
    //         totalSleepPerPerson[i] = {
    //             username: participants[i].username,
    //             photo: participants[i].profilePhoto,
    //             amountOfSleep: Math.floor((Math.random()*50) + 1)
    //         }
    //     }

    //     this.setState({aggregatedSleepPerUser: totalSleepPerPerson});

    //    let sleepGraphCoordinatesPerPerson = [];

    //     for(let i = 0; i < amountOfUsers; i++) {
    //             sleepGraphCoordinatesPerPerson[i] = {
    //                 name: participants[i].username,
    //                 coordinates: []
    //             }

    //             for(let days = 0; days < amountOfDays; days++) {
    //                 sleepGraphCoordinatesPerPerson[i].coordinates[days] = {"x": days, "y": totalSleepPerPerson[i].amountOfSleep - days}
    //             }
    //         }

    //     this.setState({sleepGraphCoordinatesPerPerson: sleepGraphCoordinatesPerPerson});
            
    //     console.log("Sleep Coordinates: ", sleepGraphCoordinatesPerPerson);
    //     }


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