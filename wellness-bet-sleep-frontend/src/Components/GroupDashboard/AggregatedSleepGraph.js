import React, { Component } from 'react';
import styled from 'styled-components';
import d3 from "d3";

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 400px;
    margin: 2%;
`


export default class AggregatedSleepGraph extends Component {

    constructor(props){
        super(props)
    }

    renderSleepGraph() {
        
    }

    render(){
        return(
            <RoundedItem>
            <div className="AggregatedSleepGraph">
            <h2>Competition Statistics:</h2>
            </div>
            </RoundedItem>
        );
    }
}