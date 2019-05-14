import React, { Component } from 'react';
import styled from 'styled-components';
import {XYPlot, LineSeries, HorizontalGridLines,
    VerticalGridLines,  XAxis,
    YAxis, ChartLabel} from 'react-vis';

const RoundedItem = styled.div`
    border-radius: 7px;
    border-style: solid;
    border-color: #89cff0;
    height: 400px;
    margin: 2%;

    display: flex;
    flex-direction: row;

    justify-content: center;
`

// https://github.com/uber/react-vis/blob/master/docs/line-series.md
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

            <XYPlot height={300} width={700}>

            <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
            <VerticalGridLines style={{stroke: '#B7E9ED'}} /> 

            <XAxis />
            <YAxis />

            <ChartLabel 
            text="X Axis"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.025}
            yPercent={1.01}
            />

          <ChartLabel 
            text="Y Axis"
            className="alt-y-label"
            includeMargin={false}
            xPercent={0.06}
            yPercent={0.06}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
            />
            {this.props.sleepCoordinatesPerPerson.map(person => {
              return <LineSeries data={person.coordinates} style={{strokeWidth: 5}}/>
            })}

            </XYPlot>

            </div>
            </RoundedItem>
        );
    }
}