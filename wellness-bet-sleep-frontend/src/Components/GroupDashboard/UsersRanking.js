import React, { Component } from 'react';
import styled from 'styled-components';
import UserRanking from "./UserRanking.js";

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 300px;
    margin: 2%;
    width: 33%;

    display: flex;
    flex-direction: column;
`

export default class UsersRanking extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return(

            <RoundedItem>
            <div className="UsersRanking">
            <h2>Rankings:</h2>
            {this.props.usersSleepData.map( (user, index) => {
               return <UserRanking userSleepData={user}/>
            })}
            </div>
            </RoundedItem>
        );
    }
}