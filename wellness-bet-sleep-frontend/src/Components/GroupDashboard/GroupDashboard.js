import React, { Component } from 'react';
import axios from '../../axios-sleep.js';
import { connect } from 'react-redux';


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

class GroupDashboard extends Component {

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
            currentUserTodaySleep: 0,
            currentUserAggregatedSleep: 0,

            startDate: "",
            endDate: "",
            daysLeft: "",
            buyInAmount: ""

        }

        // this.getDataAfterStateUpdated();

    }

    componentDidMount() {

        // this.getData();
        // this.getDataAfterStateUpdated();

        console.log("After component did mount: " , this.state);
    }

    getData() {
        this.getGroupConfiguration();
        this.getGroupSleepData();
    }

    getDataAfterStateUpdated() {
        this.getCurrentUserSleepData();
        // this.calculateCurrentUserAggregatedData();
    }

    setDateRange(startDate, endDate) {
        axios.get(`/api/groups/${this.props.user.joinCode}/participant`)
        this.setState({startDate: startDate, endDate: endDate, amountOfDays: endDate-startDate})
    }

    getGroupConfiguration = () => {
        axios.get(`/api/groups/join:${this.props.user.joinCode}`)
        .then(response => {

            let group = response.data; 

            this.setDateRange(group.startDate, group.endDate);
            this.setState({buyInAmount: group.buyInAmt});
            this.setState({potTotal: group.potTotal});
        }
        )
        .catch(
            err => { console.log(err); }
        )
        
    }

    getGroupSleepData = () => {

        axios.get(`/api/groups/${this.props.user.joinCode}/participant`)
        .then(response => {
            console.log("Participants: ", response.data);
            this.setState({groupUsers: response.data});
            this.setState({amountOfUsers: response.data.length});

            // this.setUpDummySleepData(response.data.participant.length, response.data.participant, amountOfDays);

            let participants = response.data;

            let totalSleepPerGroup = [];
            let sleepGraphCoordinatesPerGroup = [];
             
            participants.map(participant => {

                    if(participant.SleepData)   {
                        let userSleepDataSessions = participant.SleepData; 

                        let sleepPerUser = { 
                            username: participant.username,
                            photo: participant.profilePhoto,
                            amountOfSleep: 0
                        }

                        let sleepGraphCoordinatesPerPerson = {
                            name: participant.username,
                            coordinates: [],
                            sleepPerDay: []
                        }

                        let dayNumber = 0; 

                        userSleepDataSessions.map((sleepDataSession) => {

                            let totalSleepInHoursPerDay = this.convertMillisecondsToHours(sleepDataSession.activeTimeMillis);
                            
                            let startTime = parseFloat(sleepDataSession.startTimeMillis);
                            let endTime = parseFloat(sleepDataSession.endTimeMillis);

                            if(this.isSleepInSameDay(startTime,endTime)){

                                let sleepCoordinate = this.calculateSleepCoordinatesPerDay(startTime,endTime, totalSleepInHoursPerDay,dayNumber);
                                sleepGraphCoordinatesPerPerson.coordinates.push(sleepCoordinate);

                                let sleepDate = new Date(startTime);

                                sleepGraphCoordinatesPerPerson.sleepPerDay.push({sleepDate, totalSleepInHoursPerDay});
                                dayNumber += 1; 

                            }
                            else
                            {
                                sleepGraphCoordinatesPerPerson = this.calculateSleepCoordinatesPerSeveralDays(startTime,endTime,totalSleepInHoursPerDay,sleepGraphCoordinatesPerPerson, dayNumber);

                                let StartDate = new Date(startTime);
                                let EndDate = new Date(endTime);
                        
                                let dayDifference = Math.abs(StartDate.getDate()-EndDate.getDate());

                                dayNumber += dayDifference;
                            }

                            sleepPerUser.amountOfSleep += totalSleepInHoursPerDay;

                        })
                    }
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

        if (dayDifference <= 1) {
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

        for(let day = (dayNumber+1) ; day < (dayNumber + dayDifference); day++) {

            sleepCoordinatesPerPerson.coordinates.push({"x": day, "y": 23});
            sleepCoordinatesPerPerson.sleepPerDay.push({});
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

        // this.setState({currentUserSleep: 8})
        console.log("props user", this.props.user);
        axios.get(`/api/users/${this.props.user.firebase_id}`)
            .then(response => { 
                
                let currentUser = response.data.user;
                console.log("CurrentUSER", response.data.user);
                console.log("Total aggregated sleep for current user session: ", currentUser.SleepData)

                // let userSleepDataSessions = JSON.parse(currentUser.SleepData);
                // console.log("userSleepDataSessions ", userSleepDataSessions); 

                let sleepPerCurrentUser = { 
                    username: currentUser.username,
                    photo: currentUser.profilePhoto,
                    amountOfSleep: 0
                }

                let sleepGraphCoordinatesPerCurrentUser = {
                    name: currentUser.username,
                    coordinates: [],
                    sleepPerDay: []
                }


                let dayNumber = 0; 

                let sleep_sessions = [];
                for(var i in currentUser.SleepData)
                {
                    sleep_sessions.push(currentUser.SleepData[i]);
                }
            
            

                // console.log("Sleep Sessions in Array form:", sleep_sessions);

               sleep_sessions.map(session => {

                    console.log("How much the current each logged in user is getting per session:", session);
                    let totalSleepInHoursPerDay = parseFloat(this.convertMillisecondsToHours(session.activeTimeMillis),10);
                        
                        let startTime = parseFloat(session.startTimeMillis,10);
                        let endTime = parseFloat(session.endTimeMillis,10);

                        if(this.isSleepInSameDay(startTime,endTime)){

                            let sleepCoordinate = this.calculateSleepCoordinatesPerDay(startTime,endTime, totalSleepInHoursPerDay,dayNumber);

                            let sleepDate = new Date(startTime);

                            sleepGraphCoordinatesPerCurrentUser.sleepPerDay.push({"date": sleepDate, "hours": totalSleepInHoursPerDay});
                            sleepGraphCoordinatesPerCurrentUser.coordinates.push(sleepCoordinate);
                            
                            dayNumber += 1; 

                        }
                        else
                        {
                            sleepGraphCoordinatesPerCurrentUser = this.calculateSleepCoordinatesPerSeveralDays(startTime,endTime,totalSleepInHoursPerDay,sleepGraphCoordinatesPerCurrentUser, dayNumber);

                            let StartDate = new Date(startTime);
                            let EndDate = new Date(endTime);
                    
                            let dayDifference = Math.abs(StartDate.getDate()-EndDate.getDate());

                            dayNumber += dayDifference;
                        }

                        sleepPerCurrentUser.amountOfSleep += totalSleepInHoursPerDay;
                        

                })

                // let currentDaySleepAmount = sleepGraphCoordinatesPerCurrentUser.sleepPerDay.filter(day => day.date == new Date());

                this.setState({
                    sleepCoordinatesPerPerson: sleepGraphCoordinatesPerCurrentUser.coordinates,

                })

                // this.setState({
                //     currentUserTodaySleep: currentDaySleepAmount.hours
                // })                    

                this.setState({
                    currentUserAggregatedSleep: sleepPerCurrentUser.amountOfSleep
                })
            
            })
            .catch(err => console.log(err));
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
            <UserSleepStatus currentUserSleep={this.state.currentUserTodaySleep} totalSleep={this.state.currentUserAggregatedSleep}/>
            </HorizontalInfo>

            <AggregatedSleepGraph sleepCoordinatesPerPerson={this.state.sleepCoordinatesPerPerson}/>
            </div>
        
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    }
}

export default connect(mapStateToProps)(GroupDashboard);