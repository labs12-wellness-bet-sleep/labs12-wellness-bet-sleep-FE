import React, { Component } from 'react';
import styled from 'styled-components'

const Ranking = styled.div`
    display: flex;
    flex-direction: row; 
    margin: 2%;
    justify-content: space-between;
`

const ProfilePic = styled.div`
    width: 25%;
`

export default class UserRanking extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return(

            <Ranking>
                <div className="photo"><ProfilePic><img src={this.props.userSleepData.photo} width="45px"/></ProfilePic></div>
                <div className="username">{this.props.userSleepData.fullName}</div>
                <div className="sleepAmount">{this.props.userSleepData.amountOfSleep} hours</div>
            </Ranking>
        );
    }
}