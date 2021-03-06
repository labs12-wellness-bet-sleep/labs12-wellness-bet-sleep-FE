import React, { Component } from 'react';
import axios from '../../axios-sleep.js';
import { connect } from 'react-redux';

import actions from '../../Store/Actions';
import { auth } from '../../FirebaseConfig';

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

class TestUserDashboard extends Component {

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
            amountOfDays: ""

        }

        // this.getDataAfterStateUpdated();

    }

    componentDidMount() {
        // auth.onAuthStateChanged((user) => {
        //     console.log(user, 'in auth listener')
        //     if (user) {
        //       const { uid, ra, email } = user;
        //       localStorage.setItem('token', ra)
        //       if (user.email) {
        //         const { email } = user;
        //         this.props.oAuth({ firebase_id: uid, email, token: ra });
                
        //         }
        //     }
        // })
        // this.getData();
        
        this.getDataAfterStateUpdated();

        console.log("After component did mount: " , this.state);
    }

    getData() {
        this.getGroupID();
        this.getGroupInfo();
    }

    getDataAfterStateUpdated() {
        this.getCurrentUserSleepData();
        // this.calculateCurrentUserAggregatedData();
    }

    getDateRange(startDate, endDate) {
        this.setState({startDate: startDate, endDate: endDate, amountOfDays: endDate-startDate})
    }

    // check firebase restricted 
    getGroupID() {
    }

    getGroupInfo = () => {

        let amountOfDays = "";

        // axios.get(`https://sleep-bet.herokuapp.com/api/users/`)
        // .then(response => {
        //     this.getDateRange(response.data.startDate,response.data.endDate);
        //     this.calculateTimeLeft(response.data.endDate);
        //     console.log("Group: ", response.data);
        //     this.setState({group: response.data});

        //     amountOfDays = 30;
        //     console.log("Amount of days: ", amountOfDays);
        // })
        // .catch(err => console.log(err));

        axios.get("/api/users/")
        .then(response => {
            console.log("Participants: ", response.data);
            this.setState({groupUsers: response.data});
            this.setState({amountOfUsers: this.state.groupUsers.length});

            // this.setUpDummySleepData(response.data.participant.length, response.data.participant, amountOfDays);

            let participants = response.data;
            console.log("Look at this response", response);

            let totalSleepPerGroup = [];
            let sleepGraphCoordinatesPerGroup = [];
             
            participants.map(participant => {

                    if(participant.sleepData)   {
                        let userSleepDataSessions = JSON.parse(participant.SleepData); 

                        let sleepPerUser = { 
                            username: participant.username,
                            photo: participant.profilePhoto,
                            amountOfSleep: ""
                        }

                        let sleepGraphCoordinatesPerPerson = {
                            name: participant.username,
                            coordinates: [],
                            sleepPerDay: []
                        }

                        let dayNumber = 0; 

                        userSleepDataSessions.map((sleepDataSession) => {

                            let totalSleepInHoursPerDay = this.convertMillisecondsToHours(sleepDataSession.activeTimeMillis);
                            
                            let startTime = sleepDataSession.startTimeMillis;
                            let endTime = sleepDataSession.endTimeMillis;

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

    getCurrentUserSleepData = () => {

        let fbId = localStorage.getItem("fb_id");
        let token = localStorage.getItem("token");

        // this.setState({currentUserSleep: 8})
        console.log("fbID ",fbId);
        console.log("props user", this.props.user);
        axios.get(`/api/users/${fbId}`, {headers: {'authorization': token}})
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

        // axios.get(`https://api.fitbit.com/1.2/user/${this.state.fitbitUserID}/sleep/date/${this.state.startDate}/${this.state.endDate}.json`)
        //         .then(data => {
        //             this.setState({currentUserSleep: data });
        // })
    }

    // calculateCurrentUserAggregatedData() {

    //     // alternative b) make up random numbers

    //     this.setState({currentUserAggregatedSleep: 24})
    //     // this.state.currentUserSleep.map(sleepNight => {
    //     //     this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep += sleepNight.timeleft})
    //     // })

    //     // this.setState({currentUserAggregatedSleep: currentUserAggregatedSleep/60});
    // }

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

const mapDispatchToProps = dispatch => {
    return {
      oAuth: user => dispatch(actions.auth.initOAuth(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestUserDashboard);