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

export default class TimeLeft extends Component {
    
    constructor(props){
        super(props)
    }

    renderRing() {
        var maxWidth = 200;
        var maxHeight = 200;
        var outerRadius = 100;
        var ringWidth = 20;


        // https://bl.ocks.org/jiankuang/a591ff3331044f8c9a59764a1424bb07
        // function drawRing(config) {
        //     var pie = d3.layout.pie().value(function (d) {
        //         return d.count;
        //     });
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