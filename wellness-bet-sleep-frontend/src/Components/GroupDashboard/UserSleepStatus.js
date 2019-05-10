import React, { Component } from 'react';
import styled from 'styled-components'
// import d3 from "d3";

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 300px;
    margin: 2%;
    width: 33%;
`

export default class UserSleepStatus extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return(

            <RoundedItem>
            <div className="UserSleepStatus">
            <h2>My Stats:</h2>
            
            <h3>Today:</h3>
            {this.props.currentUserSleep} hours

            <h3>Total:</h3>
            {this.props.totalSleep} hours

            </div>
            </RoundedItem>
        );
    }
}