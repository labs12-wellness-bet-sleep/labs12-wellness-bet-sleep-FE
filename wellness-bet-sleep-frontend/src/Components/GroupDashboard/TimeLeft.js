import React, { Component } from 'react';
import styled from 'styled-components'

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 300px;
    margin: 2%;
    width: 33%;
`

export default class TimeLeft extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return(

            <RoundedItem>
            <div className="TimeLeft">
            <h2>Time Left:</h2>
            </div>
            </RoundedItem>
        );
    }
}