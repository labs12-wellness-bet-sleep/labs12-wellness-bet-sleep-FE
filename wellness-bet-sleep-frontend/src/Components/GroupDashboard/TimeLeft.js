import React, { Component } from 'react';
import styled from 'styled-components'

import {RadialChart} from 'react-vis';

/// https://uber.github.io/react-vis/documentation/getting-started/creating-a-new-react-vis-project
/// https://github.com/uber/react-vis/blob/master/docs/radial-chart.md

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 300px;
    margin: 2%;
    width: 33%;

    display: flex;
    flex-directon: column;
`

export default class TimeLeft extends Component {
    
    constructor(props){
        super(props)
    }

    render(){

        let data = [{angle: 5, label:"14 days left"}, {angle: 2}]; 

        return(

            <RoundedItem>
            <div className="TimeLeft">
            <h2>Time Left:</h2>
            <RadialChart data={data}  width={200}
            height={200} showLabels={true}/>
            <svg refs="ring"/>
            </div>
            </RoundedItem>
        );
    }
}